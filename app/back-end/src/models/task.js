const TaskSchema = (sequelize, DataTypes) => {
  const TaskTable = sequelize.define('Task', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    created: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'tasks',
    underscored: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  TaskTable.associate = (models) => {
    TaskTable.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };
  return TaskTable;
}

module.exports = TaskSchema;