const zod = require("zod");

exports.validate = (field, type) => {

    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(8);
    const nameSchema = zod.string();
    const yearSchema = zod.number().int().min(2020).max(2024);
    const rollNoSchema = zod.number().min(1000000000).max(9999999999);

    if (type === "email") {
        return emailSchema.safeParse(field).success;
    }
    else if (type === "pass") {
        return passwordSchema.safeParse(field).success;
    }
    else if (type === "name") {
        return nameSchema.safeParse(field).success;
    }
    else if (type === "year") {
        return yearSchema.safeParse(field).success;
    }
    else if (type === "roll") {
        return rollNoSchema.safeParse(field).success;
    }
}