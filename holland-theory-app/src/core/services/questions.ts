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

interface GetNextQuestionsResult {
  questions: QuestionEntity[],
  nextQuestionsLink: string,
}

export const getQuestions = async (
  path = Urls.Questions, insertFullPath: boolean = false,
): Promise<GetQuestionsResult | null> => {
  try {
    const result = await onetWebService.makeRequest<QuestionsQueryResult>(path, '', insertFullPath);
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
      const questions = questionsList.map((questionItem) => ({
        ...questionItem,
        answerValue: -1,
      }));

      return {
        questions,
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

export const getNextQuestions = async (
  nextQuestionsLink: string,
): Promise<GetNextQuestionsResult | null> => {
  try {
    const result = await getQuestions(nextQuestionsLink as Urls, true);

    return {
      questions: result?.questions || [],
      nextQuestionsLink: result?.nextQuestionsLink || '',
    };
  } catch {
    return null;
  }
};
