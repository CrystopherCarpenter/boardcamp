import rentalRepository from '../repository/rentalRepository.js';
import dayjs from 'dayjs';
import customerService from '../service/customerService.js';
import gameService from '../service/gameService.js';

const create = async (rental) => {
    const customer = await customerService.getById(rental.customerId);
    const game = await gameService.getById(rental.gameId);
    const availability = await stock(rental.gameId);
    const originalPrice = rental.daysRented * game.pricePerDay;
    const date = dayjs().format('YYYY-MM-DD');

    if (!customer || !game || !availability) throw 409;

    return await rentalRepository.insert({ ...rental, originalPrice, date });
};

const stock = async (id) => {
    const { rows: rentals } = await rentalRepository.getAllActiveByGameId(id);
    const { stockTotal } = await gameService.getById(id);

    return rentals.length < stockTotal;
};

const getByCustomerOrGameId = async ({ customerId, gameId }) => {
    if (!customerId && !gameId) return await getAll();
    if (customerId) return await getByCustomerId(customerId);
    if (gameId) return await getByGameId(gameId);
};

const getByCustomerId = async (id) => {
    const { rows } = await rentalRepository.getByCustomerId(id);

    return rentalFormatter(rows);
};

const getByGameId = async (id) => {
    const { rows } = await rentalRepository.getByGameId(id);

    return rentalFormatter(rows);
};

const getAll = async () => {
    const { rows } = await rentalRepository.getAll();

    return rentalFormatter(rows);
};

const rentalFormatter = (rentals) => {
    return rentals.map((el) => {
        const customer = { id: el.customerId, name: el.customerName };
        const game = {
            id: el.gameId,
            name: el.gameName,
            categoryId: el.categoryId,
            categoryName: el.categoryName,
        };
        const rental = { ...el };
        delete rental.customerName;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;

        return { ...rental, customer, game };
    });
};

const finish = async (id) => {
    const date = dayjs().format('YYYY-MM-DD');
    const {
        rows: [rental],
    } = await rentalRepository.getById(id);

    if (!rental) throw 404;
    if (rental.returnDate) throw 400;

    const delayFee = delayFeeCalc(rental);

    return await rentalRepository.update(date, delayFee, id);
};

const delayFeeCalc = (rental) => {
    let delayFee = 0;
    const returnDate = dayjs(rental.rentDate).add(3, 'day');

    if (dayjs().isAfter(returnDate, 'day')) {
        const pricePerDay = rental.originalPrice / rental.daysRented;
        delayFee = pricePerDay * dayjs().diff(returnDate, 'day');
    }
    return delayFee;
};

const exclude = async (id) => {
    const {
        rows: [rental],
    } = await rentalRepository.getById(id);

    if (!rental) throw 404;
    if (rental.returnDate) throw 400;

    return await rentalRepository.exclude(id);
};

const rentalService = {
    create,
    getByCustomerOrGameId,
    finish,
    exclude,
};

export default rentalService;
