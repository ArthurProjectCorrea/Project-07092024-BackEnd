module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Definindo o relacionamento: Um usuário pode ter muitos códigos
  User.associate = (models) => {
    User.hasMany(models.Code, { foreignKey: 'userId' });
  };

  return User; // Retorne o modelo definido
};
