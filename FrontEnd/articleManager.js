/** Gestion des article en objets **/

class ArticleManager {
    constructor(listeArticle){
        this.listeArticle = listeArticle;
    }

    sort(){
        this.listeArticle.sort((a,b) => {
            (Date.parse(a.publicationDate) < Date.parse(b.publicationDate))?1:-1;

        });
    }
}
