export default (sequelize, DataTypes) => {
    const Account = sequelize.define('account', {
        uid: {
            type: DataTypes.INTEGER,
        },
        username: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
        },
    });

    Account.associate = (models) => {
        // 1:M
        Account.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
    };

    return Account;
};