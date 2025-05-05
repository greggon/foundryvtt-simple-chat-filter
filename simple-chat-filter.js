Hooks.on('renderChatLog', (app, html, data) => {
    const chatControls = html.find('#chat-form');

    const filterInput = $('<input>')
        .attr({
            type: 'text',
            id: 'chat-filter-input',
            placeholder: 'Filter chat messages..'
        });

    chatControls.before(filterInput);

    const applyFilter = () => {
        const filterText = filterInput.val().toLowerCase();
        const messages = html.find('#chat-log .message');

        messages.each(function() {
            const message = $(this);
            const messageContent = message.find('.message-content').text().toLowerCase();

            if (messageContent.includes(filterText)) {
                message.show();
            } else {
                message.hide();
            }
        });

        //If the filter is empty, scroll down to the latest message. Otherwise if you clear the filter, chat 
        //will remain offset by the filter
        if(!filterText)
            app.scrollBottom();
    };

    filterInput.on('input', applyFilter);

    filterInput.on('keydown', (event) => {
        if(event.key ==='Escape' || event.keyCode ===27) {
            event.preventDefault();
            filterInput.val('');
            applyFilter();
        }
    })

    app.element.on('click', 'a.header-button.close', () => {
        filterInput.val('');
        applyFilter();
    });
});