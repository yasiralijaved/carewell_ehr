const { defineAbilitiesFor } = require('./shared_module/abilities'); // Ensure the path is correct
const { createContext } = require('react');

// Create and export AbilityContext
const AbilityContext = createContext();

module.exports = {
  defineAbilitiesFor,
  AbilityContext
};