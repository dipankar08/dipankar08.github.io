function refreshGraph(url){
  $(".onegraph").attr('remote_url', url);
  loadItem($(".onegraph"))
}