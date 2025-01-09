# Integritetspolicy för {{company_name}}

## Om oss

**{{company_name}}** (org.nr {{org_number}}) är personuppgiftsansvarig för behandlingen av personuppgifter på webbplatsen {{domain}}.

## Kontaktinformation

Du kan kontakta oss angående dataskydd och integritet via: {{contact_email}}

## Insamling av personuppgifter

{{#if forms.length}}

### Formulär

Vi samlar in personuppgifter genom följande formulär:
{{#each forms}}

- {{this}}
  {{/each}}
  {{/if}}

## Cookies och spårning

{{#if cookies.length}}
Vi använder följande cookies på vår webbplats:

{{#each cookies}}

### {{name}}

- **Typ**: {{type}}
- **Syfte**: {{description}}
  {{/each}}
  {{else}}
  Vi använder för närvarande inga cookies på vår webbplats.
  {{/if}}

## Tredjepartstjänster

{{#if google_maps}}

### Google Maps

Vi använder Google Maps på vår webbplats. Google kan samla in data enligt deras integritetspolicy.
{{/if}}

Senast uppdaterad: {{currentDate}}
