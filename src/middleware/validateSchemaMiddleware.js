export const validateSchemaMiddleware = (schema) => {
    return (req, res, next) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            throw 400;
        }

        next();
    };
};
