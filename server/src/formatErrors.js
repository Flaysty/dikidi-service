import _ from 'lodash';

export default (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'someting went wrong' }];
};