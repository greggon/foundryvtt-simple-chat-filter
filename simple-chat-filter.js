Hooks.on('renderChatLog', (app, html, data) => {
    const chatControls = html.find('#chat-form');

    const filterInput = $('<input>')
        .attr({
            type: 'text',
            id: 'chat-filter-input',
            placeholder: 'Filter chat messages..'
        });

    chatControls.before(filterInput);

    filterInput.on('input', (event) => {
        const filterText = event.target.value.toLowerCase();
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
    });

    app.element.on('click', 'a.header-button.close', () => {
        filterInput.val('');
        html.find('#chat-log .message').show();
    });
});