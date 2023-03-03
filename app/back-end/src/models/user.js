const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dark_mode: DataTypes.BOOLEAN,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.Task, {
      as: 'tasks',
      foreignKey: 'user_id',
    });
  };
  return UserTable;
}

module.exports = UserSchema;