
export class QuestionStatus {
    questionAttemptTime: string;
    finalSubmitAns: string;
    examSeqNo: number;
    questionSeqNo: number;
    questionId: string;
    course: string;
    markedForReview: boolean;
    visited: boolean;
    navButtonClass: String = 'btn btn-primary btn-custom-wid not_visited';
}
