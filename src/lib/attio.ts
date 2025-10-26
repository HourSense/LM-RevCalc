interface CreateLeadParams {
  email: string;
  feeEarners: number;
}

export async function createAttioLead({ email, feeEarners }: CreateLeadParams) {
  const attioApiKey = process.env.ATTIO_API_KEY;

  if (!attioApiKey) {
    throw new Error('ATTIO_API_KEY is not configured');
  }

  try {
    // Step 1: Create/assert person record
    const personResponse = await fetch('https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${attioApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{
              email_address: email
            }]
          }
        }
      })
    });

    const personData = await personResponse.json();

    if (!personResponse.ok) {
      console.error('Attio person creation error:', personData);
      throw new Error(`Attio person API error: ${personResponse.status}`);
    }

    console.log('Successfully created/updated person:', personData);

    // Step 2: Add person to "Leads" list
    const personId = personData.data.id.record_id;

    const listResponse = await fetch('https://api.attio.com/v2/lists/385aaab2-28e3-4b81-8890-a6c4ea6d3dbe/entries', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${attioApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          parent_object: 'people',
          parent_record_id: personId,
          entry_values: {         }
        }
      })
    });

    const listData = await listResponse.json();

    if (!listResponse.ok) {
      console.error('Attio list addition error:', listData);
      // Don't fail the whole operation if list addition fails
      console.log('Person created but failed to add to list');

      return { success: true, data: personData, listError: listData };
    }

    console.log('Successfully added person to Leads list:', listData);

    return { success: true, data: personData, listData };
  } catch (error) {
    console.error('Error creating Attio lead:', error);

    return { success: false, error };
  }
}