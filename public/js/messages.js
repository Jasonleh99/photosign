var other;

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

$(document).ready(function(){
    $('#send-doc-btn').click(function() {
        $.get('/release-form', function(res) {
            $('#embedded-url').text(res.data);
            alert("Please check the sidebar for the link to send to your client");
        });
    });
})

$.get('/getSelf', function(ree){
    $.get('/getPartner', function(res){
        Talk.ready.then(function() {
            var me = new Talk.User({
                id: ree.email.hashCode(),
                name: ree.name,
                email: ree.email
            });
            window.talkSession = new Talk.Session({
                appId: "t6QYCU3m",
                me: me
            });
            other = new Talk.User({
                id: res.email.hashCode(),
                name: res.name,
                email: res.email,
                //photoUrl: "https://demo.talkjs.com/img/sebastian.jpg"
            });
        
            var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
            conversation.setParticipant(me);
            conversation.setParticipant(other);
            var inbox = talkSession.createInbox({selected: conversation});
            inbox.mount($("#talkjs-container"));
        });
    })
})