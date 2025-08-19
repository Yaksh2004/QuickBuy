import { registerUserSchema } from "../Schemas/userSchema.js"

export const newUserValidate = (req, res, next) => {
    const result = registerUserSchema.safeParse(req.body);
    if(!result.success){
        return res.json({
            error: result.error.issues
        })
    }
    req.body = result.data;
    next();
}