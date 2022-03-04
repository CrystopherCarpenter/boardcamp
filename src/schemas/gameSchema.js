import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().base64({ paddingRequired: false }).required(),
    stockTotal: joi.number().greater(0).required(),
    pricePerDay: joi.number().greater(0).required(),
    categoryId: joi.string().required(),
});

export default gameSchema;
