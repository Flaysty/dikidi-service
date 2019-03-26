import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Данный логин уже используется',
            },
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: 'Логин может состоять только из латинских букв и цифр',
                },
                len: {
                    args: [6, 25],
                    msg: 'Логин пользователя должет содержать от 6 до 25 символов',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 25],
                    msg: 'Пароль должен содержать от 6 до 25 символов',
                },
            },
        },
    }, {
            hooks: {
                afterValidate: async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, 12);
                    // eslint-disable-next-line no-param-reassign
                    user.password = hashedPassword;
                },
            },
        });

    return User;
};