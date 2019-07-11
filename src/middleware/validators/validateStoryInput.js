const isNotNull = ({ type, value }) => {
  if (!value) {
    return [`The ${type} cannot be empty.`];
  }
  return [];
};

const titleIsNotTooLong = (title = '') => {
  if (title.length > 50) {
    return ['Provide a title that is no longer than 50 chars'];
  }
  return [];
};

const validateStoryInput = (req, res, next) => {
  const { title, body } = req.body;

  const errors = [
    ...isNotNull({ type: 'title', value: title }),
    ...isNotNull({ type: 'body', value: body }),
    ...titleIsNotTooLong(title),
  ];

  if (errors.length > 0) {
    return res.status(400).send({ msg: 'Bad request', errors });
  }
  next();
};

export default validateStoryInput;
