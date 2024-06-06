using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

public class RemoveIdPropertyFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        // Check if the operation is a PUT or POST
        if (context.ApiDescription.HttpMethod == "PUT" || context.ApiDescription.HttpMethod == "POST")
        {
            // Find the request body parameter
            var requestBody = operation.RequestBody;
            if (requestBody?.Content != null)
            {
                foreach (var content in requestBody.Content)
                {
                    var schema = content.Value.Schema;

                    // Remove the Id property from the schema
                    if (schema.Properties.ContainsKey("Id"))
                    {
                        schema.Properties.Remove("Id");
                    }
                }
            }
        }
    }
}
