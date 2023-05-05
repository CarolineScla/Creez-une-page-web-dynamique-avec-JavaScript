class article {
    constructor(jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
    }

    getFormatedDate(article){
        let timestamp = Date.parse(this.publicationDate);
        let date = new Date(timestamp);
        return date.toLocaleTimeString()
    }
} 