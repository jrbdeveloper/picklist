$.widget("widgets.PickList", {
    options: {
        ListLocation: "",
        ActiveLabel: "",
        InactiveLabel: ""
    },

    _init: function () {
        this._load();
        this._registerEvents();
    },

    _load: function () {
        this._initializeControls();

        if (this.options.InactiveLabel != "" && this.options.ActiveLabel != "") {
            $(this.InactiveContainer).append(this.InactiveLabel);
            $(this.ActiveContainer).append(this.ActiveLabel);
            $(this.ButtonContainer).append("<br>");
        }

        $(this.InactiveContainer).append(this.InactiveItems);
        $(this.ButtonContainer).append(this.IncludeButton);
        $(this.ButtonContainer).append(this.ExcludeButton);
        $(this.ActiveContainer).append(this.ActiveItems);

        $(this.element).append(this.InactiveContainer);
        $(this.element).append(this.ButtonContainer);
        $(this.element).append(this.ActiveContainer);

        this._loadList();
    },

    _registerEvents: function () {
        var self = this;

        $(self.IncludeButton).on({
            click: function () {
                self._include($("#InactiveItems option:selected"), $("#ActiveItems option"), $("#ActiveItems"));
            }
        });

        $(self.ExcludeButton).on({
            click: function () {
                self._exclude($("#ActiveItems option:selected"), $("#InactiveItems option"), $("#InactiveItems"));
            }
        });
    },

    _initializeControls: function () {
        var self = this;

        self.InactiveLabel = self._createControl({
            type: "label", cssClass: "",
            text: self.options.InactiveLabel,
            value: self.options.InactiveLabel,
            html: self.options.InactiveLabel
        });

        self.ActiveLabel = self._createControl({
            type: "label", cssClass: "",
            text: self.options.ActiveLabel,
            value: self.options.ActiveLabel,
            html: self.options.ActiveLabel
        });

        self.InactiveContainer = self._createControl({ type: "div", id: "inactive-container", cssClass: "list-container" });
        self.InactiveItems = self._createControl({ type: "select", id: "InactiveItems", cssClass: "control", multiple: "multiple" });

        self.ButtonContainer = self._createControl({ type: "div", id: "button-container", cssClass: "button-container" });
        self.IncludeButton = self._createControl({ type: "button", id: "include-button", cssClass: "button button-default", text: ">" });
        self.ExcludeButton = self._createControl({ type: "button", id: "exclude-button", cssClass: "button button-default", text: "<" });

        self.ActiveContainer = self._createControl({ type: "div", id: "active-container", cssClass: "list-container" });
        self.ActiveItems = self._createControl({ type: "select", id: "ActiveItems", cssClass: "control", multiple: "multiple" });
    },

    _loadList: function () {
        var self = this;

        if (this.options.ListLocation != "") {
            var inactive = this._getModel(null, this.options.ListLocation, false);

            $.each(inactive, function (index, item) {
                $("#InactiveItems").append(self._createControl({ type: "option", value: item.Value, text: item.Text }));
            });
        }
    },

    _include: function (selectedItems, savedItems, destination) {
        var self = this;

        $.each(selectedItems, function (index, item) {
            var option = self._createControl({ type: "option", text: item.text, value: item.value });

            if ($.inArray($(item).val(), self._getValues(savedItems)) == -1) {
                $(option).appendTo(destination);
                $(item).remove();
            }
        });
    },

    _exclude: function (selectedItems, savedItems, destination) {
        var self = this;

        $.each(selectedItems, function (index, item) {
            var option = self._createControl({ type: "option", text: item.text, value: item.value });

            if ($.inArray($(item).val(), self._getValues(savedItems)) == -1) {
                $(option).prependTo(destination);
                $(item).remove();
            }
        });
    },

    _getModel: function (data, api, async) {
        var ret;

        $.ajax({
            method: "GET",
            url: api,
            dataType: "json",
            data: data != null ? data : "",
            async: async,
        }).done(function (result) {
            ret = result;
        }).fail(function (text, msg) {
        });

        return ret;
    },

    _getValues: function (ctrl) {
        var valuesArray = ctrl.map(function () {
            return this.value;
        }).get();

        return valuesArray;
    },

    _createControl: function (props) {
        var control = document.createElement(props.type);

        $(control).prop("name", props.name);
        $(control).prop("id", props.id);
        $(control).prop("class", props.cssClass);
        $(control).prop("value", props.value);
        $(control).prop("text", props.text);
        $(control).prop("multiple", props.multiple);
        $(control).val(props.value);

        if (props.type == "label" || props.type == "button") {
            $(control).html(props.text);
        }

        return control;
    },
});