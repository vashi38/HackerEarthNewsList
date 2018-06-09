// @ts-check

class News {
  constructor(obj) {
    this.srNo = News.TOTAL++;
    this.header = obj.title;
    if (obj.url) {
      let baseUrl = obj.url.split('/')[2];
      let formatedUrl = baseUrl.split('.').filter(function (e) {
        if (e.toUpperCase() === 'WWW')
          return false;
        else
          return true;
      }).join('.');
      this.showUrl = formatedUrl;
    } else
      this.ShowUrl = "";
      this.url = obj.url;
      this.author = obj.author;
      this.points = obj.num_points;
      this.comments = obj.num_comments;
    let date = new Date(obj.created_at).toDateString();
    this.description = obj.num_points + ' points by ' +
      obj.author +' on ' + date +
      ' | hide | ' + obj.num_comments +
      ' comments ';
  }
}
News.TOTAL = 1;
module.exports = News;
