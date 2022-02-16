const handler = (req, res) => {
    res.status(200).json({ text: 'Hola api serveless' })
}

export default handler