export default (sequelize, DataTypes) => {
    const Studio = sequelize.define('studio', {
        sid: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        intKey: {
            type: DataTypes.STRING,
        },
    });

    Studio.associate = (models) => {
        // 1:M
        Studio.belongsTo(models.Account, {
            foreignKey: {
                name: 'accountId',
                field: 'accound_id',
            },
        });
        // 1:M
        Studio.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
    };

    return Studio;
};