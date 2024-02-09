import jwt from "jsonwebtoken"
export const generateToken = (user) => {
    try {
        let jwtSecretKey = process.env.JWT_STRING;
        let data = {
            userName: user.userName,
            password: user.password,
            role: user.role,
            _id: user._id
        };

        const token = jwt.sign(data, jwtSecretKey, {
            expiresIn: '30minutes'
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Error generating token");
    }
};