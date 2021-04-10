import { QuestionEntity } from '../interfaces/question';
import { onetWebService } from './onet-web';
import { Urls } from '../constants/urls';
import { AnswerEntity } from '../interfaces/answer';

export interface QuestionsQueryResult {
  question: QuestionEntity[];
  link: {
    href: string,
    rel: string,
  }[];
  start: number;
  end: number;
  total: number;
  answer_options: {
    answer_option: AnswerEntity[],
  };
}

interface GetQuestionsResult {
  questions: QuestionEntity[];
  nextQuestionsLink: string;
  totalNumberOfQuestions: number;
  answerVariants: AnswerEntity[];
}

export const getQuestions = async (): Promise<GetQuestionsResult | null> => {
  try {
    const result = await onetWebService.makeRequest<QuestionsQueryResult>(Urls.Questions);
    if (result.error) {
      throw new Error(result.error);
    }

    if (result.data) {
      const { link, question: questionsList, total, answer_options: answersData } = result.data;
      const linksLength = link.length;
      const nextLinkObject = link.find((linkItem) => linkItem.rel === 'next');
      const nextQuestionsLink = (linksLength > 0 && !!nextLinkObject)
        ? nextLinkObject.href
        : '';

      return {
        questions: questionsList,
        nextQuestionsLink,
        totalNumberOfQuestions: total,
        answerVariants: answersData.answer_option,
      };
    }

    return null;
  } catch {
    return null;
  }
};
