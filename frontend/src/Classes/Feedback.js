export class Feedback
{
    constructor(id, dateOfCreation, feedbackHistoryId, note) {
        this.id = id;
        this.dateOfCreation = dateOfCreation;
        this.feedbackHistoryId = feedbackHistoryId;
        this.note = note;
    }
}