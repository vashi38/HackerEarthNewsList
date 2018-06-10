// @ts-check

class News {
  constructor(obj) {
    this.srNo = News.TOTAL++;
    this.header = obj.title;
    this.url = obj.url;
    this.author = obj.author;
    this.points = obj.num_points;
    this.comments = obj.num_comments;
  }
  getFormatedUrl() {
    let formatedUrl;
    let baseUrl;
    if (this.url) {
      baseUrl = this.url.split('/')[2];
      formatedUrl = baseUrl.split('.').filter(function (e) {
        return e.toUpperCase() !== 'WWW';
      }).join('.');
    } else {
      formatedUrl = "";
    }
    return formatedUrl;
  }
  getFormatedDesc() {
    let date = new Date(this.created_at).toDateString();
    let description = this.points + ' points by ' +
      this.author + ' on ' + date +
      ' | hide | ' + this.comments +
      ' comments ';
    return description;
  }

}
News.TOTAL = 1;
module.exports = News;
