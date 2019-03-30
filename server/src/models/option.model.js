export default (sequelize, DataTypes) => {
    const Option = sequelize.define('option', {
        counter: {
            type: DataTypes.INTEGER,
        },
        days: {
            type: DataTypes.INTEGER,
        },
        when: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.BOOLEAN,
        },
        text: {
            type: DataTypes.TEXT,
        },
    });

    Option.associate = (models) => {
        // 1:M
        Option.belongsTo(models.Studio, {
            foreignKey: {
                name: 'studioId',
                field: 'studio_id',
            },
        });
    };

    return Option;
};