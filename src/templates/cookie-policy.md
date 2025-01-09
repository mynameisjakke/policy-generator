# Cookie Policy för {{company_name}}

## Översikt

Vi på **{{company_name}}** värnar om din integritet. Denna policy beskriver hur vi använder cookies på vår webbplats {{domain}}.

## Företagsinformation

- Organisationsnummer: {{org_number}}
- Kontakta oss: {{contact_email}}

## Cookies vi använder

{{#if cookies.length}}
Följande cookies används på vår webbplats:

{{#each cookies}}

### {{name}}

- **Typ**: {{type}}
- **Beskrivning**: {{description}}
  {{/each}}
  {{else}}
  Vi använder för närvarande inga cookies på vår webbplats.
  {{/if}}

## Formulär på webbplatsen

{{#if forms.length}}
Vår webbplats innehåller följande formulär:
{{#each forms}}

- {{this}}
  {{/each}}
  {{else}}
  Vår webbplats innehåller för närvarande inga formulär.
  {{/if}}

## Google Maps

{{#if google_maps}}
Vår webbplats använder Google Maps för att visa kartor. Google Maps kan använda egna cookies enligt Googles cookiepolicy.
{{else}}
Vår webbplats använder inte Google Maps.
{{/if}}

Senast uppdaterad: {{currentDate}}
