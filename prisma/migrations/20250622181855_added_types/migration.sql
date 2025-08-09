-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "type" "QuestionType" NOT NULL DEFAULT 'single';

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "type" "QuizType" NOT NULL DEFAULT 'single';
