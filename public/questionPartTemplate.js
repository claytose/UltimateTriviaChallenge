(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['questionPart'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "    <input type=\"radio\" name=\"answer\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\" required> "
    + alias2(alias1(depth0, depth0))
    + "<br>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"question") || (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"question","hash":{},"data":data,"loc":{"start":{"line":2,"column":3},"end":{"line":2,"column":15}}}) : helper)))
    + "</p>\r\n<form action=\"/game\" method=\"post\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"choices") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":6,"column":11}}})) != null ? stack1 : "")
    + "  <button type=\"submit\">Submit Answer</button>\r\n</form>";
},"useData":true});
})();