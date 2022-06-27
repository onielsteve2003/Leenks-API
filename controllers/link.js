const Link = require('../models/Link')

exports.addLink = (req, res) => {
    Link.find({ name: req.body.name })
    .then(link => {
        if(link){
            res.status(403).json({ ResponseCode: 403, error: "Link already exists" })
        } else {
            Link.create(req.body)
            .then(link => res.status(201).json({ ResponseCode: 201, msg: "Link added successfully", link }))
            .catch(err => res.status(500).json({ ResponseCode: 500, err}))
        }
    })
}

// Get links belonging to a particular user
exports.getAllLinks = (req, res) => {
    Link.find({ userId: req.params.userId }).populate("userId").exec()
    .then(links => res.status(200).json({ ResponseCode: 200, links}))
    .catch(err => res.status(500).json({ ResponseCode: 500, err}))
}

// Get single link by itys Id
exports.getLink = (req, res) => {
    Link.findById(req.params.id).populate("userId").exec()
    .then(link => res.status(200).json({ ResponseCode: 200, link}))
    .catch(err => res.status(500).json(err))
}

// Edit Link
exports.editLink = (req, res) => {
    Link.updateOne({ _id: req.params.id }, {
        $set: req.body
    })
    .then(() => res.status(201).json({ ResponseCode: 201, msg: "Link updated successfully" }))
    .catch(err => res.status(500).json({ ResponseCode: 500, err}))
}

// Increase times clicked
exports.increaseClicks = (req, res) => {
    Link.updateOne({ _id: req.params.id }, {
        $inc: { timesClicked: 1 }
    })
    .then(() => res.status(201).json({ ResponseCode: 201, msg: "Clicked updated successfully" }))
    .catch(err => res.status(500).json({ ResponseCode: 500, err}))
}