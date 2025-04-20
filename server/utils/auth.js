import jwt from 'jsonwebtoken'

export const createToken = (authInfo) => {
    const payload = { ...authInfo };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
};

export const validateToken = (token) => {
    // console.log(token);
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return payload;
};
