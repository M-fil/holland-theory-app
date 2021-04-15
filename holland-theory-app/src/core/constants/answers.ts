export const AnswersActiveImages = {
  StronglyDislike: require('../../assets/answers/strongly-dislike.svg'),
  Dislike: require('../../assets/answers/dislike.svg'),
  Unsure: require('../../assets/answers/unsure.svg'),
  Like: require('../../assets/answers/like.svg'),
  StronglyLike: require('../../assets/answers/strongly-like.svg'),
}

export const AnswersInactiveImages = {
  StronglyDislike: require('../../assets/answers/strongly-dislike-inactive.svg'),
  Dislike: require('../../assets/answers/dislike-inactive.svg'),
  Unsure: require('../../assets/answers/unsure-inactive.svg'),
  Like: require('../../assets/answers/like-inactive.svg'),
  StronglyLike: require('../../assets/answers/strongly-like-inactive.svg'),
}

export enum AnswersValues {
  StronglyDislike = 1,
  Dislike = 2,
  Unsure = 3,
  Like = 4,
  StronglyLike = 5,
}

export const AnswersActiveObject = {
  [AnswersValues.StronglyDislike]: AnswersActiveImages.StronglyDislike,
  [AnswersValues.Dislike]: AnswersActiveImages.Dislike,
  [AnswersValues.Unsure]: AnswersActiveImages.Unsure,
  [AnswersValues.Like]: AnswersActiveImages.Like,
  [AnswersValues.StronglyLike]: AnswersActiveImages.StronglyLike,
};

export const AnswersInactiveObject = {
  [AnswersValues.StronglyDislike]: AnswersInactiveImages.StronglyDislike,
  [AnswersValues.Dislike]: AnswersInactiveImages.Dislike,
  [AnswersValues.Unsure]: AnswersInactiveImages.Unsure,
  [AnswersValues.Like]: AnswersInactiveImages.Like,
  [AnswersValues.StronglyLike]: AnswersInactiveImages.StronglyLike,
};
