export class QuestionSet {
    examSeqNo: number;
    questionSeqNo: number;
    paragraphQuestionid: string;
    paragraphBodyEng: string;
    paragraphBodyHnd: string;
    paragraphImage: string;
    questionId: string;
    questionBodyEng: string = '';
    questionBodyHindi: string = '';
    optionBodyAEng: string = '';
    optionBodyBEng: string = '';
    optionBodyCEng: string = '';
    optionBodyDEng: string = '';
    optionBodyEEng: string = '';
    optionBodyAHnd: string = '';
    optionBodyBHnd: string = '';
    optionBodyCHnd: string = '';
    optionBodyDHnd: string = '';
    optionBodyEHnd: string = '';
    questionBodyImage: string = '';
    noOfOpt: number;
    questionAttemptTime: string;
    finalSubmitAns: string;
    subjectId: string;
    optionBodyAImg: string;
    optionBodyBImg: string;
    optionBodyCImg: string;
    optionBodyDImg: string;
    optionBodyEImg: string;
    fullMarks: number;
    negativeMarks: number;
    questionLevel: string;
    chapterId: string = '';
    courseGroup: string;
    correctAns: string;
}
