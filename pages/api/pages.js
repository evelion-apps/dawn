import Page from '../../data/pages'

export default function listPages(req, res) {
  res.status(200).json(Page.list())
}
