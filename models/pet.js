const pet = (sequelize, DataTypes) => {
    const Pet = sequelize.define('pet', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
          type: DataTypes.STRING,
      },
      poop: {
          type: DataTypes.INTEGER
      },
      hunger: {
          type: DataTypes.INTEGER
      },
      hygiene: {
          type: DataTypes.INTEGER
      },
      createdAt: {
          type: DataTypes.DATE
      },
      updatedAt: {
          type: DataTypes.DATE
      }
    });
  
  
    return Pet;
  };

module.exports = pet;