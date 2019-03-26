export default (sequelize, DataTypes) => {
    const Studio = sequelize.define('studio', {
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    return Studio;
};