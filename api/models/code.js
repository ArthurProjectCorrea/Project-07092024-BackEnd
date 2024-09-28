module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define('Code', {
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  });

  Code.associate = (models) => {
    Code.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Code;
};
