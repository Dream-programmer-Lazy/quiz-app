
const resultService = require('../services/resultService');

const createResult = async (req, res) => {
  try {
    const result = await resultService.createResult(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await resultService.getAllResults();
    return res.status(200).json(results);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getResultById = async (req, res) => {
  try {
    const result = await resultService.getResultById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: { message: "Result not found!" } });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const updateResultById = async (req, res) => {
  try {
    const result = await resultService.updateResultById(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({ error: { message: "Result not found!" } });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const deleteResultById = async (req, res) => {
  try {
    const result = await resultService.deleteResultById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: { message: "Result not found!" } });
    }
    return res.status(200).json({ message: "Delete result successfully." });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};


const getResultsByUserId = async (req, res) => {
  try {
    const results = await resultService.getResultsByUserId(req.params.userId);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultById,
  updateResultById,
  deleteResultById,
  getResultsByUserId
};
