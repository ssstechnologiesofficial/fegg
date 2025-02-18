const PreviousPaperModel = require('../model/PreviousYearModel')

// Create a new Ebook entry
const createPreviousPaper = async (req, res) => {
  console.log(req.body)
  try {
    const { year, className, subject, language } = req.body
    const file = req.file.path
    const ebook = new PreviousPaperModel({
      year,

      className,
      subject,
      language,
      file: file,
    })
    await ebook.save()
    res.status(201).json({ message: 'Ebook uploaded successfully', ebook })
  } catch (error) {
    res.status(500).json({ message: 'Error uploading ebook', error })
  }
}

// Get all eBooks
const getAllPreviousPaper = async (req, res) => {
  try {
    const { className, language } = req.query
    const query = {}
    if (className) query.className = className
    if (language) query.language = language

    const previousPapers = await PreviousPaperModel.find(query)
    res.status(200).json(previousPapers)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching previous papers', error })
  }
}

// Get eBooks by class
const getPreviousPaperByClass = async (req, res) => {
  try {
    const { className } = req.params
    const ebooks = await PreviousPaperModel.find({ className })
    res.status(200).json(ebooks)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ebooks by class', error })
  }
}

// Update an Ebook
const updatePreviousPaper = async (req, res) => {
  try {
    const { id } = req.params
    const { year, className, subject, language, file } = req.body
    const Ppaper = await PreviousPaperModel.findByIdAndUpdate(
      id,
      { year, className, subject, language, file },
      { new: true }
    )
    if (!Ppaper) {
      return res.status(404).json({ message: 'Paper not found' })
    }
    res.status(200).json({ message: 'Paper updated successfully', Ppaper })
  } catch (error) {
    res.status(500).json({ message: 'Paper updating ebook', error })
  }
}

// Delete an Ebook
const deletePreviousPaper = async (req, res) => {
  try {
    const { id } = req.params
    const ebook = await PreviousPaperModel.findByIdAndDelete(id)
    if (!ebook) {
      return res.status(404).json({ message: 'Ebook not found' })
    }
    res.status(200).json({ message: 'Ebook deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ebook', error })
  }
}

module.exports = {
  createPreviousPaper,
  getAllPreviousPaper,
  getPreviousPaperByClass,
  updatePreviousPaper,
  deletePreviousPaper,
}
