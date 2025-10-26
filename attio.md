# Assert a person Record

> Use this endpoint to create or update person records, using a unique attribute to search for existing People (for example the `email_addresses` attribute). If a person is found with the same value for the matching attribute, that person will be updated. If no person with the same value for the matching attribute is found, a new person will be created instead. If you would like to avoid matching, please use the Create person endpoint.


If the matching attribute is a multiselect attribute, new values will be added and existing values will not be deleted. For any other multiselect attribute, all values will be either created or deleted as necessary to match the list of supplied values.

Required scopes: `record_permission:read-write`, `object_configuration:read`.

## OpenAPI

````yaml https://api.attio.com/openapi/standard-objects put /v2/objects/people/records
paths:
  path: /v2/objects/people/records
  method: put
  servers:
    - url: https://api.attio.com
      description: Production
  request:
    security:
      - title: oauth2
        parameters:
          query: {}
          header:
            Authorization:
              type: oauth2
              description: This API uses OAuth 2.0 with the authorization code grant flow.
          cookie: {}
    parameters:
      path: {}
      query:
        matching_attribute:
          schema:
            - type: string
              required: true
              description: >-
                The ID or slug of the attribute to use to check if a person
                already exists. The attribute must be unique. For person records
                `email_addresses` is the only unique attribute, but you can add
                additional custom attributes with unique constraints.
              example: email_addresses
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - type: object
                    properties:
                      values:
                        type: object
                        properties:
                          email_addresses:
                            type: array
                            items:
                              type: object
                              properties:
                                email_address:
                                  type: string
                                  description: An email address string
                                  example: alice@app.attio.com
                          name:
                            type: array
                            items:
                              type: object
                              properties:
                                first_name:
                                  type: string
                                  example: Ada
                                  description: The first name.
                                last_name:
                                  type: string
                                  example: Lovelace
                                  description: The last name.
                                full_name:
                                  type: string
                                  example: Ada Lovelace
                                  description: The full name.
                          description:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          avatar_url:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          job_title:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          phone_numbers:
                            type: array
                            items:
                              type: object
                              required:
                                - original_phone_number
                              properties:
                                original_phone_number:
                                  type: string
                                  example: '+15558675309'
                                  description: >-
                                    A phone number which is either a) prefixed
                                    with a country code (e.g. `+44....`) or b) a
                                    local number, where `country_code` is
                                    specified in addition.
                                country_code:
                                  type:
                                    - string
                                    - 'null'
                                  enum:
                                    - AF
                                    - AX
                                    - AL
                                    - DZ
                                    - AS
                                    - AD
                                    - AO
                                    - AI
                                    - AQ
                                    - AG
                                    - AR
                                    - AM
                                    - AW
                                    - AU
                                    - AT
                                    - AZ
                                    - BS
                                    - BH
                                    - BD
                                    - BB
                                    - BY
                                    - BE
                                    - BZ
                                    - BJ
                                    - BM
                                    - BT
                                    - BO
                                    - BA
                                    - BW
                                    - BV
                                    - BR
                                    - IO
                                    - BN
                                    - BG
                                    - BF
                                    - BI
                                    - KH
                                    - CM
                                    - CA
                                    - CV
                                    - KY
                                    - CF
                                    - TD
                                    - CL
                                    - CN
                                    - CX
                                    - CC
                                    - CO
                                    - KM
                                    - CG
                                    - CD
                                    - CK
                                    - CR
                                    - CI
                                    - HR
                                    - CU
                                    - CW
                                    - CY
                                    - CZ
                                    - DK
                                    - DJ
                                    - DM
                                    - DO
                                    - EC
                                    - EG
                                    - SV
                                    - GQ
                                    - ER
                                    - EE
                                    - ET
                                    - FK
                                    - FO
                                    - FJ
                                    - FI
                                    - FR
                                    - GF
                                    - PF
                                    - TF
                                    - GA
                                    - GM
                                    - GE
                                    - DE
                                    - GH
                                    - GI
                                    - GR
                                    - GL
                                    - GD
                                    - GP
                                    - GU
                                    - GT
                                    - GG
                                    - GN
                                    - GW
                                    - GY
                                    - HT
                                    - HM
                                    - VA
                                    - HN
                                    - HK
                                    - HU
                                    - IS
                                    - IN
                                    - ID
                                    - IR
                                    - IQ
                                    - IE
                                    - IM
                                    - IL
                                    - IT
                                    - JM
                                    - JP
                                    - JE
                                    - JO
                                    - KZ
                                    - KE
                                    - KI
                                    - KR
                                    - KW
                                    - KG
                                    - LA
                                    - LV
                                    - LB
                                    - LS
                                    - LR
                                    - LY
                                    - LI
                                    - LT
                                    - LU
                                    - MO
                                    - MK
                                    - MG
                                    - MW
                                    - MY
                                    - MV
                                    - ML
                                    - MT
                                    - MH
                                    - MQ
                                    - MR
                                    - MU
                                    - YT
                                    - MX
                                    - FM
                                    - MD
                                    - MC
                                    - MN
                                    - ME
                                    - MS
                                    - MA
                                    - MZ
                                    - MM
                                    - NA
                                    - NR
                                    - NP
                                    - NL
                                    - AN
                                    - NC
                                    - NZ
                                    - NI
                                    - NE
                                    - NG
                                    - NU
                                    - NF
                                    - MP
                                    - 'NO'
                                    - OM
                                    - PK
                                    - PW
                                    - PS
                                    - PA
                                    - PG
                                    - PY
                                    - PE
                                    - PH
                                    - PN
                                    - PL
                                    - PT
                                    - PR
                                    - QA
                                    - RE
                                    - RO
                                    - RU
                                    - RW
                                    - BL
                                    - SH
                                    - KN
                                    - LC
                                    - MF
                                    - PM
                                    - VC
                                    - WS
                                    - SM
                                    - ST
                                    - SA
                                    - SN
                                    - SS
                                    - RS
                                    - SC
                                    - SL
                                    - SG
                                    - SK
                                    - SI
                                    - SB
                                    - SO
                                    - ZA
                                    - GS
                                    - ES
                                    - LK
                                    - SD
                                    - SR
                                    - SJ
                                    - SZ
                                    - SE
                                    - CH
                                    - SY
                                    - TW
                                    - TJ
                                    - TZ
                                    - TH
                                    - TL
                                    - TG
                                    - TK
                                    - TO
                                    - TT
                                    - TN
                                    - TR
                                    - TM
                                    - TC
                                    - TV
                                    - UG
                                    - UA
                                    - AE
                                    - GB
                                    - US
                                    - UM
                                    - UY
                                    - UZ
                                    - VU
                                    - VE
                                    - VN
                                    - VG
                                    - VI
                                    - WF
                                    - EH
                                    - YE
                                    - ZM
                                    - ZW
                                    - BQ
                                    - KP
                                    - SX
                                    - XK
                                    - AC
                                  example: GB
                                  description: >-
                                    The ISO 3166-1 alpha-2 country code
                                    representing the country that this phone
                                    number belongs to. Optional if
                                    `original_phone_number` includes a country
                                    code prefix.
                          linkedin:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          twitter:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          facebook:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          instagram:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          angellist:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                              required:
                                - value
                              additionalProperties: false
                          primary_location:
                            type: array
                            items:
                              type: object
                              properties:
                                line_1:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The first line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: 1 Infinite Loop
                                line_2:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The second line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: Block 1
                                line_3:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The third line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: Hilldrop Estate
                                line_4:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The fourth line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: Westborough
                                locality:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The town, neighborhood or area the location
                                    is in.
                                  example: Cupertino
                                region:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The state, county, province or region that
                                    the location is in.
                                  example: CA
                                postcode:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The postcode or zip code for the location.
                                    Note that this value is not currently
                                    represented in the UI but will be persisted
                                    and readable through API calls.}
                                  example: '95014'
                                country_code:
                                  type:
                                    - string
                                    - 'null'
                                  enum:
                                    - AF
                                    - AX
                                    - AL
                                    - DZ
                                    - AS
                                    - AD
                                    - AO
                                    - AI
                                    - AQ
                                    - AG
                                    - AR
                                    - AM
                                    - AW
                                    - AU
                                    - AT
                                    - AZ
                                    - BS
                                    - BH
                                    - BD
                                    - BB
                                    - BY
                                    - BE
                                    - BZ
                                    - BJ
                                    - BM
                                    - BT
                                    - BO
                                    - BA
                                    - BW
                                    - BV
                                    - BR
                                    - IO
                                    - BN
                                    - BG
                                    - BF
                                    - BI
                                    - KH
                                    - CM
                                    - CA
                                    - CV
                                    - KY
                                    - CF
                                    - TD
                                    - CL
                                    - CN
                                    - CX
                                    - CC
                                    - CO
                                    - KM
                                    - CG
                                    - CD
                                    - CK
                                    - CR
                                    - CI
                                    - HR
                                    - CU
                                    - CW
                                    - CY
                                    - CZ
                                    - DK
                                    - DJ
                                    - DM
                                    - DO
                                    - EC
                                    - EG
                                    - SV
                                    - GQ
                                    - ER
                                    - EE
                                    - ET
                                    - FK
                                    - FO
                                    - FJ
                                    - FI
                                    - FR
                                    - GF
                                    - PF
                                    - TF
                                    - GA
                                    - GM
                                    - GE
                                    - DE
                                    - GH
                                    - GI
                                    - GR
                                    - GL
                                    - GD
                                    - GP
                                    - GU
                                    - GT
                                    - GG
                                    - GN
                                    - GW
                                    - GY
                                    - HT
                                    - HM
                                    - VA
                                    - HN
                                    - HK
                                    - HU
                                    - IS
                                    - IN
                                    - ID
                                    - IR
                                    - IQ
                                    - IE
                                    - IM
                                    - IL
                                    - IT
                                    - JM
                                    - JP
                                    - JE
                                    - JO
                                    - KZ
                                    - KE
                                    - KI
                                    - KR
                                    - KW
                                    - KG
                                    - LA
                                    - LV
                                    - LB
                                    - LS
                                    - LR
                                    - LY
                                    - LI
                                    - LT
                                    - LU
                                    - MO
                                    - MK
                                    - MG
                                    - MW
                                    - MY
                                    - MV
                                    - ML
                                    - MT
                                    - MH
                                    - MQ
                                    - MR
                                    - MU
                                    - YT
                                    - MX
                                    - FM
                                    - MD
                                    - MC
                                    - MN
                                    - ME
                                    - MS
                                    - MA
                                    - MZ
                                    - MM
                                    - NA
                                    - NR
                                    - NP
                                    - NL
                                    - AN
                                    - NC
                                    - NZ
                                    - NI
                                    - NE
                                    - NG
                                    - NU
                                    - NF
                                    - MP
                                    - 'NO'
                                    - OM
                                    - PK
                                    - PW
                                    - PS
                                    - PA
                                    - PG
                                    - PY
                                    - PE
                                    - PH
                                    - PN
                                    - PL
                                    - PT
                                    - PR
                                    - QA
                                    - RE
                                    - RO
                                    - RU
                                    - RW
                                    - BL
                                    - SH
                                    - KN
                                    - LC
                                    - MF
                                    - PM
                                    - VC
                                    - WS
                                    - SM
                                    - ST
                                    - SA
                                    - SN
                                    - SS
                                    - RS
                                    - SC
                                    - SL
                                    - SG
                                    - SK
                                    - SI
                                    - SB
                                    - SO
                                    - ZA
                                    - GS
                                    - ES
                                    - LK
                                    - SD
                                    - SR
                                    - SJ
                                    - SZ
                                    - SE
                                    - CH
                                    - SY
                                    - TW
                                    - TJ
                                    - TZ
                                    - TH
                                    - TL
                                    - TG
                                    - TK
                                    - TO
                                    - TT
                                    - TN
                                    - TR
                                    - TM
                                    - TC
                                    - TV
                                    - UG
                                    - UA
                                    - AE
                                    - GB
                                    - US
                                    - UM
                                    - UY
                                    - UZ
                                    - VU
                                    - VE
                                    - VN
                                    - VG
                                    - VI
                                    - WF
                                    - EH
                                    - YE
                                    - ZM
                                    - ZW
                                    - BQ
                                    - KP
                                    - SX
                                    - XK
                                    - AC
                                  description: >-
                                    The ISO 3166-1 alpha-2 country code for the
                                    country this location is in.
                                  example: US
                                latitude:
                                  type:
                                    - string
                                    - 'null'
                                  pattern: ^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$
                                  description: >-
                                    The latitude of the location. Validated by
                                    the regular expression
                                    `/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/`.
                                    Values are stored with up to 9 decimal
                                    places of precision. Note that this value is
                                    not currently represented in the UI but will
                                    be persisted and readable through API
                                    calls.}
                                  example: '37.331741'
                                longitude:
                                  type:
                                    - string
                                    - 'null'
                                  pattern: >-
                                    ^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
                                  description: >-
                                    The longitude of the location. Validated by
                                    the regular expression
                                    `/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/`.
                                    Values are stored with up to 9 decimal
                                    places of precision. Note that this value is
                                    not currently represented in the UI but will
                                    be persisted and readable through API
                                    calls.}
                                  example: '-122.030333'
                              required:
                                - line_1
                                - line_2
                                - line_3
                                - line_4
                                - locality
                                - region
                                - postcode
                                - country_code
                                - latitude
                                - longitude
                              additionalProperties: false
                          twitter_follower_count:
                            type: array
                            items:
                              type: object
                              properties:
                                value:
                                  type: number
                                  description: Numbers are persisted as 64 bit floats.
                                  example: 42
                              required:
                                - value
                              additionalProperties: false
                          company:
                            type: array
                            items:
                              anyOf:
                                - type: object
                                  properties:
                                    target_object:
                                      type: string
                                      description: >-
                                        A UUID or slug to identify the object
                                        that the referenced record belongs to.
                                      example: people
                                    target_record_id:
                                      type: string
                                      format: uuid
                                      description: >-
                                        A UUID to identify the referenced
                                        record.
                                      example: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                                  required:
                                    - target_object
                                    - target_record_id
                                  additionalProperties: false
                                - type: object
                                  example:
                                    target_object: people
                                    matching_attribute_id_123:
                                      - value: matching_attribute_id_123
                                  properties:
                                    target_object:
                                      type: string
                                      example: people
                                      description: >-
                                        A UUID or slug to identify the object
                                        that the referenced record belongs to.
                                    '[slug_or_id_of_matching_attribute]':
                                      type: array
                                      description: >-
                                        In addition to referencing records
                                        directly by record ID, you may also
                                        reference by a matching attribute of
                                        your choice. For example, if you want to
                                        add a reference to the person record
                                        with email "alice@website.com", you
                                        should pass a value with `target_object`
                                        set to `"people"` and `email_addresses`
                                        set to
                                        `[{email_address:"alice@website.com"}]`.
                                        The key should be the slug or ID of the
                                        matching attribute you would like to use
                                        and the value should be an array
                                        containing a single value of the
                                        appropriate attribute type (as specified
                                        below). Matching on multiple values is
                                        not currently supported. Matching
                                        attributes must be unique. This process
                                        is similar to how you use the
                                        `matching_attribute` query param in
                                        Attio's [assert
                                        endpoints](/rest-api/endpoint-reference/records/assert-a-record).
                                      items:
                                        anyOf:
                                          - type: object
                                            properties:
                                              domain:
                                                type: string
                                                example: app.attio.com
                                                description: The full domain of the website.
                                          - type: object
                                            properties:
                                              email_address:
                                                type: string
                                                example: alice@app.attio.com
                                                description: An email address string
                                          - type: object
                                            properties:
                                              value:
                                                type: number
                                                example: 17224912
                                                description: Numbers are persisted as 64 bit floats.
                                          - type: object
                                            properties:
                                              original_phone_number:
                                                type: string
                                                example: '07234172834'
                                                description: >-
                                                  The raw, original phone number, as
                                                  inputted.
                                              country_code:
                                                type:
                                                  - string
                                                  - 'null'
                                                enum:
                                                  - AF
                                                  - AX
                                                  - AL
                                                  - DZ
                                                  - AS
                                                  - AD
                                                  - AO
                                                  - AI
                                                  - AQ
                                                  - AG
                                                  - AR
                                                  - AM
                                                  - AW
                                                  - AU
                                                  - AT
                                                  - AZ
                                                  - BS
                                                  - BH
                                                  - BD
                                                  - BB
                                                  - BY
                                                  - BE
                                                  - BZ
                                                  - BJ
                                                  - BM
                                                  - BT
                                                  - BO
                                                  - BA
                                                  - BW
                                                  - BV
                                                  - BR
                                                  - IO
                                                  - BN
                                                  - BG
                                                  - BF
                                                  - BI
                                                  - KH
                                                  - CM
                                                  - CA
                                                  - CV
                                                  - KY
                                                  - CF
                                                  - TD
                                                  - CL
                                                  - CN
                                                  - CX
                                                  - CC
                                                  - CO
                                                  - KM
                                                  - CG
                                                  - CD
                                                  - CK
                                                  - CR
                                                  - CI
                                                  - HR
                                                  - CU
                                                  - CW
                                                  - CY
                                                  - CZ
                                                  - DK
                                                  - DJ
                                                  - DM
                                                  - DO
                                                  - EC
                                                  - EG
                                                  - SV
                                                  - GQ
                                                  - ER
                                                  - EE
                                                  - ET
                                                  - FK
                                                  - FO
                                                  - FJ
                                                  - FI
                                                  - FR
                                                  - GF
                                                  - PF
                                                  - TF
                                                  - GA
                                                  - GM
                                                  - GE
                                                  - DE
                                                  - GH
                                                  - GI
                                                  - GR
                                                  - GL
                                                  - GD
                                                  - GP
                                                  - GU
                                                  - GT
                                                  - GG
                                                  - GN
                                                  - GW
                                                  - GY
                                                  - HT
                                                  - HM
                                                  - VA
                                                  - HN
                                                  - HK
                                                  - HU
                                                  - IS
                                                  - IN
                                                  - ID
                                                  - IR
                                                  - IQ
                                                  - IE
                                                  - IM
                                                  - IL
                                                  - IT
                                                  - JM
                                                  - JP
                                                  - JE
                                                  - JO
                                                  - KZ
                                                  - KE
                                                  - KI
                                                  - KR
                                                  - KW
                                                  - KG
                                                  - LA
                                                  - LV
                                                  - LB
                                                  - LS
                                                  - LR
                                                  - LY
                                                  - LI
                                                  - LT
                                                  - LU
                                                  - MO
                                                  - MK
                                                  - MG
                                                  - MW
                                                  - MY
                                                  - MV
                                                  - ML
                                                  - MT
                                                  - MH
                                                  - MQ
                                                  - MR
                                                  - MU
                                                  - YT
                                                  - MX
                                                  - FM
                                                  - MD
                                                  - MC
                                                  - MN
                                                  - ME
                                                  - MS
                                                  - MA
                                                  - MZ
                                                  - MM
                                                  - NA
                                                  - NR
                                                  - NP
                                                  - NL
                                                  - AN
                                                  - NC
                                                  - NZ
                                                  - NI
                                                  - NE
                                                  - NG
                                                  - NU
                                                  - NF
                                                  - MP
                                                  - 'NO'
                                                  - OM
                                                  - PK
                                                  - PW
                                                  - PS
                                                  - PA
                                                  - PG
                                                  - PY
                                                  - PE
                                                  - PH
                                                  - PN
                                                  - PL
                                                  - PT
                                                  - PR
                                                  - QA
                                                  - RE
                                                  - RO
                                                  - RU
                                                  - RW
                                                  - BL
                                                  - SH
                                                  - KN
                                                  - LC
                                                  - MF
                                                  - PM
                                                  - VC
                                                  - WS
                                                  - SM
                                                  - ST
                                                  - SA
                                                  - SN
                                                  - SS
                                                  - RS
                                                  - SC
                                                  - SL
                                                  - SG
                                                  - SK
                                                  - SI
                                                  - SB
                                                  - SO
                                                  - ZA
                                                  - GS
                                                  - ES
                                                  - LK
                                                  - SD
                                                  - SR
                                                  - SJ
                                                  - SZ
                                                  - SE
                                                  - CH
                                                  - SY
                                                  - TW
                                                  - TJ
                                                  - TZ
                                                  - TH
                                                  - TL
                                                  - TG
                                                  - TK
                                                  - TO
                                                  - TT
                                                  - TN
                                                  - TR
                                                  - TM
                                                  - TC
                                                  - TV
                                                  - UG
                                                  - UA
                                                  - AE
                                                  - GB
                                                  - US
                                                  - UM
                                                  - UY
                                                  - UZ
                                                  - VU
                                                  - VE
                                                  - VN
                                                  - VG
                                                  - VI
                                                  - WF
                                                  - EH
                                                  - YE
                                                  - ZM
                                                  - ZW
                                                  - BQ
                                                  - KP
                                                  - SX
                                                  - XK
                                                  - AC
                                                example: GB
                                                description: >-
                                                  The ISO 3166-1 alpha-2 country code
                                                  representing the country that this phone
                                                  number belongs to.
                                          - type: object
                                            properties:
                                              value:
                                                type: string
                                                description: >-
                                                  A raw text field. Values are limited to
                                                  10MB.
                                  required:
                                    - target_object
                                    - '[slug_or_id_of_matching_attribute]'
                              example:
                                target_object: people
                                target_record_id: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                        description: >-
                          This object's keys should be the slugs or IDs of the
                          attributes you wish to update. Below, you'll find
                          documentation for the value types of each standard
                          person attribute. For information on potential custom
                          attributes, refer to our [attribute type
                          docs](/docs/attribute-types).
                        example:
                          email_addresses:
                            - john-smith@attio.com
                          name:
                            - first_name: John
                              last_name: Smith
                              full_name: John Smith
                          description: Developer met at event
                          company:
                            - target_object: companies
                              target_record_id: 99a03ff3-0435-47da-95cc-76b2caeb4dab
                            - target_object: companies
                              domains:
                                - domain: attio.com
                          phone_numbers:
                            - original_phone_number: '+15558675309'
                              country_code: US
                          primary_location:
                            - line_1: 1 Infinite Loop
                              line_2: null
                              line_3: null
                              line_4: null
                              locality: Cupertino
                              region: CA
                              postcode: '95014'
                              country_code: US
                              latitude: '37.331741'
                              longitude: '-122.030333'
                          linkedin: https://linkedin.com/in/johnsmith
                    required:
                      - values
                    additionalProperties: false
            required: true
            requiredProperties:
              - data
        examples:
          example:
            value:
              data:
                values:
                  email_addresses:
                    - john-smith@attio.com
                  name:
                    - first_name: John
                      last_name: Smith
                      full_name: John Smith
                  description: Developer met at event
                  company:
                    - target_object: companies
                      target_record_id: 99a03ff3-0435-47da-95cc-76b2caeb4dab
                    - target_object: companies
                      domains:
                        - domain: attio.com
                  phone_numbers:
                    - original_phone_number: '+15558675309'
                      country_code: US
                  primary_location:
                    - line_1: 1 Infinite Loop
                      line_2: null
                      line_3: null
                      line_4: null
                      locality: Cupertino
                      region: CA
                      postcode: '95014'
                      country_code: US
                      latitude: '37.331741'
                      longitude: '-122.030333'
                  linkedin: https://linkedin.com/in/johnsmith
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - type: object
                    properties:
                      id:
                        type: object
                        properties:
                          workspace_id:
                            type: string
                            format: uuid
                            description: >-
                              A UUID identifying the workspace this record
                              belongs to.
                            example: 14beef7a-99f7-4534-a87e-70b564330a4c
                          object_id:
                            type: string
                            format: uuid
                            description: >-
                              A UUID identifying the object this record belongs
                              to.
                            example: 97052eb9-e65e-443f-a297-f2d9a4a7f795
                          record_id:
                            type: string
                            format: uuid
                            description: A UUID identifying this record.
                            example: bf071e1f-6035-429d-b874-d83ea64ea13b
                        required:
                          - workspace_id
                          - object_id
                          - record_id
                      created_at:
                        type: string
                        description: When this record was created.
                        example: '2022-11-21T13:22:49.061281000Z'
                      web_url:
                        type: string
                        format: uri
                        description: >-
                          A URL that links directly to the record page in the
                          Attio web application.
                        example: >-
                          https://app.attio.com/salarya/person/bf071e1f-6035-429d-b874-d83ea64ea13b
                      values:
                        type: object
                        properties:
                          email_addresses:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                original_email_address:
                                  type: string
                                  example: alice@app.attio.com
                                email_address:
                                  type: string
                                  example: alice@app.attio.com
                                email_domain:
                                  type: string
                                  example: app.attio.com
                                email_root_domain:
                                  type: string
                                  example: attio.com
                                email_local_specifier:
                                  type: string
                                  example: alice
                                attribute_type:
                                  type: string
                                  enum:
                                    - email-address
                                  description: The attribute type of the value.
                                  example: email-address
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - original_email_address
                                - email_address
                                - email_domain
                                - email_root_domain
                                - email_local_specifier
                                - attribute_type
                          name:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                first_name:
                                  type: string
                                  description: The first name.
                                  example: Ada
                                last_name:
                                  type: string
                                  description: The last name.
                                  example: Lovelace
                                full_name:
                                  type: string
                                  description: The full name.
                                  example: Ada Lovelace
                                attribute_type:
                                  type: string
                                  enum:
                                    - personal-name
                                  description: The attribute type of the value.
                                  example: personal-name
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - first_name
                                - last_name
                                - full_name
                                - attribute_type
                              additionalProperties: false
                          description:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          avatar_url:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          job_title:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          phone_numbers:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                original_phone_number:
                                  type: string
                                  description: The raw, original phone number, as inputted.
                                  example: '5558675309'
                                country_code:
                                  type: string
                                  description: >-
                                    The ISO 3166-1 alpha-2 country code
                                    representing the country that this phone
                                    number belongs to.
                                  enum:
                                    - AF
                                    - AX
                                    - AL
                                    - DZ
                                    - AS
                                    - AD
                                    - AO
                                    - AI
                                    - AQ
                                    - AG
                                    - AR
                                    - AM
                                    - AW
                                    - AU
                                    - AT
                                    - AZ
                                    - BS
                                    - BH
                                    - BD
                                    - BB
                                    - BY
                                    - BE
                                    - BZ
                                    - BJ
                                    - BM
                                    - BT
                                    - BO
                                    - BA
                                    - BW
                                    - BV
                                    - BR
                                    - IO
                                    - BN
                                    - BG
                                    - BF
                                    - BI
                                    - KH
                                    - CM
                                    - CA
                                    - CV
                                    - KY
                                    - CF
                                    - TD
                                    - CL
                                    - CN
                                    - CX
                                    - CC
                                    - CO
                                    - KM
                                    - CG
                                    - CD
                                    - CK
                                    - CR
                                    - CI
                                    - HR
                                    - CU
                                    - CW
                                    - CY
                                    - CZ
                                    - DK
                                    - DJ
                                    - DM
                                    - DO
                                    - EC
                                    - EG
                                    - SV
                                    - GQ
                                    - ER
                                    - EE
                                    - ET
                                    - FK
                                    - FO
                                    - FJ
                                    - FI
                                    - FR
                                    - GF
                                    - PF
                                    - TF
                                    - GA
                                    - GM
                                    - GE
                                    - DE
                                    - GH
                                    - GI
                                    - GR
                                    - GL
                                    - GD
                                    - GP
                                    - GU
                                    - GT
                                    - GG
                                    - GN
                                    - GW
                                    - GY
                                    - HT
                                    - HM
                                    - VA
                                    - HN
                                    - HK
                                    - HU
                                    - IS
                                    - IN
                                    - ID
                                    - IR
                                    - IQ
                                    - IE
                                    - IM
                                    - IL
                                    - IT
                                    - JM
                                    - JP
                                    - JE
                                    - JO
                                    - KZ
                                    - KE
                                    - KI
                                    - KR
                                    - KW
                                    - KG
                                    - LA
                                    - LV
                                    - LB
                                    - LS
                                    - LR
                                    - LY
                                    - LI
                                    - LT
                                    - LU
                                    - MO
                                    - MK
                                    - MG
                                    - MW
                                    - MY
                                    - MV
                                    - ML
                                    - MT
                                    - MH
                                    - MQ
                                    - MR
                                    - MU
                                    - YT
                                    - MX
                                    - FM
                                    - MD
                                    - MC
                                    - MN
                                    - ME
                                    - MS
                                    - MA
                                    - MZ
                                    - MM
                                    - NA
                                    - NR
                                    - NP
                                    - NL
                                    - AN
                                    - NC
                                    - NZ
                                    - NI
                                    - NE
                                    - NG
                                    - NU
                                    - NF
                                    - MP
                                    - 'NO'
                                    - OM
                                    - PK
                                    - PW
                                    - PS
                                    - PA
                                    - PG
                                    - PY
                                    - PE
                                    - PH
                                    - PN
                                    - PL
                                    - PT
                                    - PR
                                    - QA
                                    - RE
                                    - RO
                                    - RU
                                    - RW
                                    - BL
                                    - SH
                                    - KN
                                    - LC
                                    - MF
                                    - PM
                                    - VC
                                    - WS
                                    - SM
                                    - ST
                                    - SA
                                    - SN
                                    - SS
                                    - RS
                                    - SC
                                    - SL
                                    - SG
                                    - SK
                                    - SI
                                    - SB
                                    - SO
                                    - ZA
                                    - GS
                                    - ES
                                    - LK
                                    - SD
                                    - SR
                                    - SJ
                                    - SZ
                                    - SE
                                    - CH
                                    - SY
                                    - TW
                                    - TJ
                                    - TZ
                                    - TH
                                    - TL
                                    - TG
                                    - TK
                                    - TO
                                    - TT
                                    - TN
                                    - TR
                                    - TM
                                    - TC
                                    - TV
                                    - UG
                                    - UA
                                    - AE
                                    - GB
                                    - US
                                    - UM
                                    - UY
                                    - UZ
                                    - VU
                                    - VE
                                    - VN
                                    - VG
                                    - VI
                                    - WF
                                    - EH
                                    - YE
                                    - ZM
                                    - ZW
                                    - BQ
                                    - KP
                                    - SX
                                    - XK
                                    - AC
                                  example: US
                                phone_number:
                                  type: string
                                  example: '+15558675309'
                                attribute_type:
                                  type: string
                                  enum:
                                    - phone-number
                                  description: The attribute type of the value.
                                  example: phone-number
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - original_phone_number
                                - country_code
                                - phone_number
                                - attribute_type
                          linkedin:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          twitter:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          facebook:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          instagram:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          angellist:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: string
                                  description: >-
                                    A raw text field. Values are limited to
                                    10MB.
                                  example: >-
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                attribute_type:
                                  type: string
                                  enum:
                                    - text
                                  description: The attribute type of the value.
                                  example: text
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                              additionalProperties: false
                          primary_location:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                line_1:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The first line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: 1 Infinite Loop
                                line_2:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The second line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: Block 1
                                line_3:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The third line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: Hilldrop Estate
                                line_4:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The fourth line of the address. Note that
                                    this value is not currently represented in
                                    the UI but will be persisted and readable
                                    through API calls.
                                  example: Westborough
                                locality:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The town, neighborhood or area the location
                                    is in.
                                  example: Cupertino
                                region:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The state, county, province or region that
                                    the location is in.
                                  example: CA
                                postcode:
                                  type:
                                    - string
                                    - 'null'
                                  description: >-
                                    The postcode or zip code for the location.
                                    Note that this value is not currently
                                    represented in the UI but will be persisted
                                    and readable through API calls.}
                                  example: '95014'
                                country_code:
                                  type:
                                    - string
                                    - 'null'
                                  enum:
                                    - AF
                                    - AX
                                    - AL
                                    - DZ
                                    - AS
                                    - AD
                                    - AO
                                    - AI
                                    - AQ
                                    - AG
                                    - AR
                                    - AM
                                    - AW
                                    - AU
                                    - AT
                                    - AZ
                                    - BS
                                    - BH
                                    - BD
                                    - BB
                                    - BY
                                    - BE
                                    - BZ
                                    - BJ
                                    - BM
                                    - BT
                                    - BO
                                    - BA
                                    - BW
                                    - BV
                                    - BR
                                    - IO
                                    - BN
                                    - BG
                                    - BF
                                    - BI
                                    - KH
                                    - CM
                                    - CA
                                    - CV
                                    - KY
                                    - CF
                                    - TD
                                    - CL
                                    - CN
                                    - CX
                                    - CC
                                    - CO
                                    - KM
                                    - CG
                                    - CD
                                    - CK
                                    - CR
                                    - CI
                                    - HR
                                    - CU
                                    - CW
                                    - CY
                                    - CZ
                                    - DK
                                    - DJ
                                    - DM
                                    - DO
                                    - EC
                                    - EG
                                    - SV
                                    - GQ
                                    - ER
                                    - EE
                                    - ET
                                    - FK
                                    - FO
                                    - FJ
                                    - FI
                                    - FR
                                    - GF
                                    - PF
                                    - TF
                                    - GA
                                    - GM
                                    - GE
                                    - DE
                                    - GH
                                    - GI
                                    - GR
                                    - GL
                                    - GD
                                    - GP
                                    - GU
                                    - GT
                                    - GG
                                    - GN
                                    - GW
                                    - GY
                                    - HT
                                    - HM
                                    - VA
                                    - HN
                                    - HK
                                    - HU
                                    - IS
                                    - IN
                                    - ID
                                    - IR
                                    - IQ
                                    - IE
                                    - IM
                                    - IL
                                    - IT
                                    - JM
                                    - JP
                                    - JE
                                    - JO
                                    - KZ
                                    - KE
                                    - KI
                                    - KR
                                    - KW
                                    - KG
                                    - LA
                                    - LV
                                    - LB
                                    - LS
                                    - LR
                                    - LY
                                    - LI
                                    - LT
                                    - LU
                                    - MO
                                    - MK
                                    - MG
                                    - MW
                                    - MY
                                    - MV
                                    - ML
                                    - MT
                                    - MH
                                    - MQ
                                    - MR
                                    - MU
                                    - YT
                                    - MX
                                    - FM
                                    - MD
                                    - MC
                                    - MN
                                    - ME
                                    - MS
                                    - MA
                                    - MZ
                                    - MM
                                    - NA
                                    - NR
                                    - NP
                                    - NL
                                    - AN
                                    - NC
                                    - NZ
                                    - NI
                                    - NE
                                    - NG
                                    - NU
                                    - NF
                                    - MP
                                    - 'NO'
                                    - OM
                                    - PK
                                    - PW
                                    - PS
                                    - PA
                                    - PG
                                    - PY
                                    - PE
                                    - PH
                                    - PN
                                    - PL
                                    - PT
                                    - PR
                                    - QA
                                    - RE
                                    - RO
                                    - RU
                                    - RW
                                    - BL
                                    - SH
                                    - KN
                                    - LC
                                    - MF
                                    - PM
                                    - VC
                                    - WS
                                    - SM
                                    - ST
                                    - SA
                                    - SN
                                    - SS
                                    - RS
                                    - SC
                                    - SL
                                    - SG
                                    - SK
                                    - SI
                                    - SB
                                    - SO
                                    - ZA
                                    - GS
                                    - ES
                                    - LK
                                    - SD
                                    - SR
                                    - SJ
                                    - SZ
                                    - SE
                                    - CH
                                    - SY
                                    - TW
                                    - TJ
                                    - TZ
                                    - TH
                                    - TL
                                    - TG
                                    - TK
                                    - TO
                                    - TT
                                    - TN
                                    - TR
                                    - TM
                                    - TC
                                    - TV
                                    - UG
                                    - UA
                                    - AE
                                    - GB
                                    - US
                                    - UM
                                    - UY
                                    - UZ
                                    - VU
                                    - VE
                                    - VN
                                    - VG
                                    - VI
                                    - WF
                                    - EH
                                    - YE
                                    - ZM
                                    - ZW
                                    - BQ
                                    - KP
                                    - SX
                                    - XK
                                    - AC
                                  description: >-
                                    The ISO 3166-1 alpha-2 country code for the
                                    country this location is in.
                                  example: US
                                latitude:
                                  type:
                                    - string
                                    - 'null'
                                  pattern: ^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$
                                  description: >-
                                    The latitude of the location. Validated by
                                    the regular expression
                                    `/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/`.
                                    Values are stored with up to 9 decimal
                                    places of precision. Note that this value is
                                    not currently represented in the UI but will
                                    be persisted and readable through API
                                    calls.}
                                  example: '37.331741'
                                longitude:
                                  type:
                                    - string
                                    - 'null'
                                  pattern: >-
                                    ^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
                                  description: >-
                                    The longitude of the location. Validated by
                                    the regular expression
                                    `/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/`.
                                    Values are stored with up to 9 decimal
                                    places of precision. Note that this value is
                                    not currently represented in the UI but will
                                    be persisted and readable through API
                                    calls.}
                                  example: '-122.030333'
                                attribute_type:
                                  type: string
                                  enum:
                                    - location
                                  description: The attribute type of the value.
                                  example: location
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - line_1
                                - line_2
                                - line_3
                                - line_4
                                - locality
                                - region
                                - postcode
                                - country_code
                                - latitude
                                - longitude
                                - attribute_type
                              additionalProperties: false
                          twitter_follower_count:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                value:
                                  type: number
                                  description: Numbers are persisted as 64 bit floats.
                                  example: 42
                                attribute_type:
                                  type: string
                                  enum:
                                    - number
                                  description: The attribute type of the value.
                                  example: number
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - value
                                - attribute_type
                          company:
                            type: array
                            items:
                              type: object
                              properties:
                                active_from:
                                  type: string
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    made "active". `active_from` can be
                                    considered roughly analogous to
                                    `created_at`.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                active_until:
                                  type:
                                    - string
                                    - 'null'
                                  format: date-time
                                  description: >-
                                    The point in time at which this value was
                                    deactivated. If `null`, the value is active.
                                  example: '2023-01-01T15:00:00.000000000Z'
                                created_by_actor:
                                  type: object
                                  description: The actor that created this value.
                                  properties:
                                    id:
                                      type: string
                                      description: An ID to identify the actor.
                                      nullable: true
                                    type:
                                      type: string
                                      enum:
                                        - api-token
                                        - workspace-member
                                        - system
                                        - app
                                      nullable: true
                                      description: >-
                                        The type of actor. [Read more
                                        information on actor types
                                        here](/docs/actors).
                                  example:
                                    type: workspace-member
                                    id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                target_object:
                                  type: string
                                  description: >-
                                    A slug identifying the object that the
                                    referenced record belongs to.
                                  example: people
                                target_record_id:
                                  type: string
                                  format: uuid
                                  description: A UUID to identify the referenced record.
                                  example: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                                attribute_type:
                                  type: string
                                  enum:
                                    - record-reference
                                  description: The attribute type of the value.
                                  example: record-reference
                              required:
                                - active_from
                                - active_until
                                - created_by_actor
                                - target_object
                                - target_record_id
                                - attribute_type
                              additionalProperties: false
                        description: >-
                          An object with `attribute_slug` keys, and an array of
                          value objects as the values. Attributes slugs (for
                          example `email_addresses` or `name`) can be used,
                          including custom attribute slugs.
                        example:
                          strongest_connection_strength_legacy:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: 54.725113205693695
                              attribute_type: number
                          last_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          twitter:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: https://x.com/johnsmith
                              attribute_type: text
                          avatar_url:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: >-
                                https://d1ts43dypk8bqh.cloudfront.net/v1/avatars/b792e7f9-003d-494f-a7b4-a53251c621e6
                              attribute_type: text
                          job_title:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: Software Engineer
                              attribute_type: text
                          next_calendar_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          company:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              target_object: companies
                              target_record_id: f528bd86-8142-4359-9a8c-b651d50a27b1
                              attribute_type: record-reference
                          primary_location:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              line_1: 1 Infinite Loop
                              line_2: null
                              line_3: null
                              line_4: null
                              locality: Cupertino
                              region: CA
                              postcode: '95014'
                              country_code: US
                              latitude: '37.331741'
                              longitude: '-122.030333'
                              attribute_type: location
                          angellist:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: https://angellist.com/johnsmith
                              attribute_type: text
                          description:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              value: Developer met at event
                              attribute_type: text
                          strongest_connection_user:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              referenced_actor_type: workspace-member
                              referenced_actor_id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: actor-reference
                          strongest_connection_strength:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              option:
                                id:
                                  workspace_id: ca10906c-6785-464e-bb6c-b003e63c6a18
                                  object_id: cf49cf53-dbb4-4d18-87fc-28aba21d7a49
                                  attribute_id: 7914c8c4-34b1-42b6-9e4c-4db8baa58bfa
                                  option_id: e37175a9-94f3-410f-bb29-78287bc1c444
                                title: Very strong
                                is_archived: false
                              attribute_type: select
                          last_email_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: system
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          email_addresses:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              original_email_address: john-smith@attio.com
                              email_address: john-smith@attio.com
                              email_domain: attio.com
                              email_root_domain: attio.com
                              email_local_specifier: john-smith
                              attribute_type: email-address
                          first_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: system
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          created_at:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: '2023-01-01T15:00:00.000000000Z'
                              attribute_type: timestamp
                          created_by:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              referenced_actor_type: workspace-member
                              referenced_actor_id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: actor-reference
                          last_calendar_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          linkedin:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: https://linkedin.com/in/johnsmith
                              attribute_type: text
                          facebook:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: https://facebook.com/johnsmith
                              attribute_type: text
                          name:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              first_name: John
                              last_name: Smith
                              full_name: John Smith
                              attribute_type: personal-name
                          first_calendar_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          twitter_follower_count:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: 100
                              attribute_type: number
                          instagram:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              value: https://instagram.com/johnsmith
                              attribute_type: text
                          first_email_interaction:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: system
                                id: null
                              interaction_type: email
                              interacted_at: '2023-01-01T15:00:00.000000000Z'
                              owner_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              attribute_type: interaction
                          phone_numbers:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: workspace-member
                                id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                              country_code: US
                              original_phone_number: '+15558675309'
                              phone_number: '+15558675309'
                              attribute_type: phone-number
                    required:
                      - id
                      - created_at
                      - web_url
                      - values
            description: Success
            requiredProperties:
              - data
        examples:
          example:
            value:
              data:
                id:
                  workspace_id: 14beef7a-99f7-4534-a87e-70b564330a4c
                  object_id: 97052eb9-e65e-443f-a297-f2d9a4a7f795
                  record_id: bf071e1f-6035-429d-b874-d83ea64ea13b
                created_at: '2022-11-21T13:22:49.061281000Z'
                web_url: >-
                  https://app.attio.com/salarya/person/bf071e1f-6035-429d-b874-d83ea64ea13b
                values:
                  strongest_connection_strength_legacy:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: 54.725113205693695
                      attribute_type: number
                  last_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  twitter:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: https://x.com/johnsmith
                      attribute_type: text
                  avatar_url:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: >-
                        https://d1ts43dypk8bqh.cloudfront.net/v1/avatars/b792e7f9-003d-494f-a7b4-a53251c621e6
                      attribute_type: text
                  job_title:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: Software Engineer
                      attribute_type: text
                  next_calendar_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  company:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      target_object: companies
                      target_record_id: f528bd86-8142-4359-9a8c-b651d50a27b1
                      attribute_type: record-reference
                  primary_location:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      line_1: 1 Infinite Loop
                      line_2: null
                      line_3: null
                      line_4: null
                      locality: Cupertino
                      region: CA
                      postcode: '95014'
                      country_code: US
                      latitude: '37.331741'
                      longitude: '-122.030333'
                      attribute_type: location
                  angellist:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: https://angellist.com/johnsmith
                      attribute_type: text
                  description:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      value: Developer met at event
                      attribute_type: text
                  strongest_connection_user:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      referenced_actor_type: workspace-member
                      referenced_actor_id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: actor-reference
                  strongest_connection_strength:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      option:
                        id:
                          workspace_id: ca10906c-6785-464e-bb6c-b003e63c6a18
                          object_id: cf49cf53-dbb4-4d18-87fc-28aba21d7a49
                          attribute_id: 7914c8c4-34b1-42b6-9e4c-4db8baa58bfa
                          option_id: e37175a9-94f3-410f-bb29-78287bc1c444
                        title: Very strong
                        is_archived: false
                      attribute_type: select
                  last_email_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: system
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  email_addresses:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      original_email_address: john-smith@attio.com
                      email_address: john-smith@attio.com
                      email_domain: attio.com
                      email_root_domain: attio.com
                      email_local_specifier: john-smith
                      attribute_type: email-address
                  first_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: system
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  created_at:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: '2023-01-01T15:00:00.000000000Z'
                      attribute_type: timestamp
                  created_by:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      referenced_actor_type: workspace-member
                      referenced_actor_id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: actor-reference
                  last_calendar_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  linkedin:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: https://linkedin.com/in/johnsmith
                      attribute_type: text
                  facebook:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: https://facebook.com/johnsmith
                      attribute_type: text
                  name:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      first_name: John
                      last_name: Smith
                      full_name: John Smith
                      attribute_type: personal-name
                  first_calendar_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  twitter_follower_count:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: 100
                      attribute_type: number
                  instagram:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      value: https://instagram.com/johnsmith
                      attribute_type: text
                  first_email_interaction:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: system
                        id: null
                      interaction_type: email
                      interacted_at: '2023-01-01T15:00:00.000000000Z'
                      owner_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      attribute_type: interaction
                  phone_numbers:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: workspace-member
                        id: a976f6a9-fc2b-4acb-91e7-afb2d18b4e64
                      country_code: US
                      original_phone_number: '+15558675309'
                      phone_number: '+15558675309'
                      attribute_type: phone-number
        description: Success
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              status_code:
                allOf:
                  - type: number
                    enum:
                      - 400
              type:
                allOf:
                  - type: string
                    enum:
                      - invalid_request_error
              code:
                allOf:
                  - type: string
                    enum:
                      - value_not_found
              message:
                allOf:
                  - type: string
                    example: >-
                      No attribute was found for matching_attribute slug/ID
                      "my-attribute".
            description: Bad Request
            requiredProperties:
              - status_code
              - type
              - code
              - message
        examples:
          example:
            value:
              status_code: 400
              type: invalid_request_error
              code: value_not_found
              message: >-
                No attribute was found for matching_attribute slug/ID
                "my-attribute".
        description: Bad Request
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              status_code:
                allOf:
                  - type: number
                    enum:
                      - 404
              type:
                allOf:
                  - type: string
                    enum:
                      - invalid_request_error
              code:
                allOf:
                  - type: string
                    enum:
                      - not_found
              message:
                allOf:
                  - type: string
                    example: Object with slug/ID "people" not found.
            description: Not Found
            requiredProperties:
              - status_code
              - type
              - code
              - message
        examples:
          example:
            value:
              status_code: 404
              type: invalid_request_error
              code: not_found
              message: Object with slug/ID "people" not found.
        description: Not Found
  deprecated: false
  type: path
components:
  schemas: {}

````# Create an entry (add record to list)

> Adds a record to a list as a new list entry. This endpoint will throw on conflicts of unique attributes. Multiple list entries are allowed for the same parent record

Required scopes: `list_entry:read-write`, `list_configuration:read`.

## OpenAPI

````yaml https://api.attio.com/openapi/api post /v2/lists/{list}/entries
paths:
  path: /v2/lists/{list}/entries
  method: post
  servers:
    - url: https://api.attio.com
      description: Production
  request:
    security:
      - title: oauth2
        parameters:
          query: {}
          header:
            Authorization:
              type: oauth2
              description: This API uses OAuth 2.0 with the authorization code grant flow.
          cookie: {}
    parameters:
      path:
        list:
          schema:
            - type: string
              required: true
              description: >-
                The UUID or slug identifying the list that the created list
                entry should belong to.
              example: 33ebdbe9-e529-47c9-b894-0ba25e9c15c0
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - type: object
                    properties:
                      parent_record_id:
                        type: string
                        format: uuid
                        description: >-
                          A UUID identifying the record you want to add to the
                          list. The record will become the 'parent' of the
                          created list entry.
                        example: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                      parent_object:
                        type: string
                        description: >-
                          A UUID or slug identifying the object that the added
                          parent record belongs to.
                        example: people
                      entry_values:
                        type: object
                        description: >-
                          An object with an attribute `api_slug` or
                          `attribute_id` as the key, and a single value (for
                          single-select attributes), or an array of values (for
                          single or multi-select attributes) as the values. For
                          complete documentation on values for all attribute
                          types, please see our [attribute type
                          docs](/docs/attribute-types).
                        additionalProperties:
                          type: array
                        example:
                          41252299-f8c7-4b5e-99c9-4ff8321d2f96: Text value
                          multiselect_attribute:
                            - Select option 1
                            - Select option 2
                    required:
                      - parent_record_id
                      - parent_object
                      - entry_values
            required: true
            requiredProperties:
              - data
        examples:
          example:
            value:
              data:
                parent_record_id: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                parent_object: people
                entry_values:
                  41252299-f8c7-4b5e-99c9-4ff8321d2f96: Text value
                  multiselect_attribute:
                    - Select option 1
                    - Select option 2
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              data:
                allOf:
                  - type: object
                    properties:
                      id:
                        type: object
                        properties:
                          workspace_id:
                            type: string
                            format: uuid
                            description: >-
                              A UUID identifying the workspace this entry
                              belongs to.
                            example: 14beef7a-99f7-4534-a87e-70b564330a4c
                          list_id:
                            type: string
                            format: uuid
                            description: A UUID identifying the list this entry is in.
                            example: 33ebdbe9-e529-47c9-b894-0ba25e9c15c0
                          entry_id:
                            type: string
                            format: uuid
                            description: A UUID identifying this entry.
                            example: 2e6e29ea-c4e0-4f44-842d-78a891f8c156
                        required:
                          - workspace_id
                          - list_id
                          - entry_id
                      parent_record_id:
                        type: string
                        format: uuid
                        description: >-
                          A UUID identifying the record that is parent of the
                          list entry.
                        example: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                      parent_object:
                        type: string
                        description: >-
                          A UUID or slug identifying the object that the parent
                          record belongs to.
                        example: people
                      created_at:
                        type: string
                        description: When this entry was created.
                        example: '2022-11-21T13:22:49.061281000Z'
                      entry_values:
                        type: object
                        additionalProperties:
                          type: array
                          items:
                            oneOf:
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  referenced_actor_type:
                                    type: string
                                    enum:
                                      - api-token
                                      - workspace-member
                                      - system
                                      - app
                                    description: >-
                                      The type of the referenced actor. [Read
                                      more information on actor types
                                      here](/docs/actors).
                                    example: workspace-member
                                  referenced_actor_id:
                                    type:
                                      - string
                                      - 'null'
                                    format: uuid
                                    description: The ID of the referenced actor.
                                    example: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  attribute_type:
                                    type: string
                                    enum:
                                      - actor-reference
                                    description: The attribute type of the value.
                                    example: actor-reference
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - referenced_actor_type
                                  - referenced_actor_id
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  value:
                                    type: boolean
                                    description: >-
                                      A boolean representing whether the
                                      checkbox is checked or not. The string
                                      values 'true' and 'false' are also
                                      accepted.
                                    example: true
                                  attribute_type:
                                    type: string
                                    enum:
                                      - checkbox
                                    description: The attribute type of the value.
                                    example: checkbox
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - value
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  currency_value:
                                    type: number
                                    description: >-
                                      A numerical representation of the currency
                                      value. A decimal with a max of 4 decimal
                                      places.
                                    example: 99
                                  currency_code:
                                    type:
                                      - string
                                      - 'null'
                                    enum:
                                      - ARS
                                      - AUD
                                      - BRL
                                      - BEL
                                      - CAD
                                      - CLP
                                      - CNY
                                      - COP
                                      - CZK
                                      - DKK
                                      - EUR
                                      - HKD
                                      - ISK
                                      - INR
                                      - ILS
                                      - JPY
                                      - KRW
                                      - MYR
                                      - MXN
                                      - NTD
                                      - NZD
                                      - NGN
                                      - NOK
                                      - XPF
                                      - PEN
                                      - PHP
                                      - PLN
                                      - GBP
                                      - RWF
                                      - SAR
                                      - SGD
                                      - ZAR
                                      - SEK
                                      - CHF
                                      - AED
                                      - UYU
                                      - USD
                                    description: >-
                                      The ISO4217 currency code representing the
                                      currency that the value is stored in.
                                    example: USD
                                  attribute_type:
                                    type: string
                                    enum:
                                      - currency
                                    description: The attribute type of the value.
                                    example: currency
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - currency_value
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  attribute_type:
                                    type: string
                                    enum:
                                      - date
                                    description: The attribute type of the value.
                                    example: date
                                  value:
                                    type: string
                                    description: >-
                                      A date represents a single calendar year,
                                      month and day, independent of timezone. If
                                      hours, months, seconds or timezones are
                                      provided, they will be trimmed. For
                                      example, "2023" and "2023-01" will be
                                      coerced into "2023-01-01", and
                                      "2023-01-02", "2023-01-02T13:00",
                                      "2023-01-02T14:00:00",
                                      "2023-01-02T15:00:00.000000000", and
                                      "2023-01-02T15:00:00.000000000+02:00" will
                                      all be coerced to "2023-01-02". If a
                                      timezone is provided that would result in
                                      a different calendar date in UTC, the date
                                      will be coerced to UTC and then the
                                      timezone component will be trimmed. For
                                      example, the value
                                      "2023-01-02T23:00:00-10:00" will be
                                      returned as "2023-01-03". The maximum date
                                      is "9999-12-31".
                                    example: '2023-01-01'
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - attribute_type
                                  - value
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  domain:
                                    type: string
                                    example: app.attio.com
                                  root_domain:
                                    type: string
                                    example: attio.com
                                  attribute_type:
                                    type: string
                                    enum:
                                      - domain
                                    description: The attribute type of the value.
                                    example: domain
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - domain
                                  - root_domain
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  original_email_address:
                                    type: string
                                    example: alice@app.attio.com
                                  email_address:
                                    type: string
                                    example: alice@app.attio.com
                                  email_domain:
                                    type: string
                                    example: app.attio.com
                                  email_root_domain:
                                    type: string
                                    example: attio.com
                                  email_local_specifier:
                                    type: string
                                    example: alice
                                  attribute_type:
                                    type: string
                                    enum:
                                      - email-address
                                    description: The attribute type of the value.
                                    example: email-address
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - original_email_address
                                  - email_address
                                  - email_domain
                                  - email_root_domain
                                  - email_local_specifier
                                  - attribute_type
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  target_object:
                                    type: string
                                    description: >-
                                      A slug identifying the object that the
                                      referenced record belongs to.
                                    example: people
                                  target_record_id:
                                    type: string
                                    format: uuid
                                    description: A UUID to identify the referenced record.
                                    example: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                                  attribute_type:
                                    type: string
                                    enum:
                                      - record-reference
                                    description: The attribute type of the value.
                                    example: record-reference
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - target_object
                                  - target_record_id
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  interaction_type:
                                    type: string
                                    enum:
                                      - calendar-event
                                      - call
                                      - chat-thread
                                      - email
                                      - in-person-meeting
                                      - meeting
                                    description: >-
                                      The type of interaction e.g. calendar or
                                      email.
                                    example: email
                                  interacted_at:
                                    type: string
                                    format: date-time
                                    description: When the interaction occurred.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  owner_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  attribute_type:
                                    type: string
                                    enum:
                                      - interaction
                                    description: The attribute type of the value.
                                    example: interaction
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - interaction_type
                                  - interacted_at
                                  - owner_actor
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  line_1:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The first line of the address. Note that
                                      this value is not currently represented in
                                      the UI but will be persisted and readable
                                      through API calls.
                                    example: 1 Infinite Loop
                                  line_2:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The second line of the address. Note that
                                      this value is not currently represented in
                                      the UI but will be persisted and readable
                                      through API calls.
                                    example: Block 1
                                  line_3:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The third line of the address. Note that
                                      this value is not currently represented in
                                      the UI but will be persisted and readable
                                      through API calls.
                                    example: Hilldrop Estate
                                  line_4:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The fourth line of the address. Note that
                                      this value is not currently represented in
                                      the UI but will be persisted and readable
                                      through API calls.
                                    example: Westborough
                                  locality:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The town, neighborhood or area the
                                      location is in.
                                    example: Cupertino
                                  region:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The state, county, province or region that
                                      the location is in.
                                    example: CA
                                  postcode:
                                    type:
                                      - string
                                      - 'null'
                                    description: >-
                                      The postcode or zip code for the location.
                                      Note that this value is not currently
                                      represented in the UI but will be
                                      persisted and readable through API calls.}
                                    example: '95014'
                                  country_code:
                                    type:
                                      - string
                                      - 'null'
                                    enum:
                                      - AF
                                      - AX
                                      - AL
                                      - DZ
                                      - AS
                                      - AD
                                      - AO
                                      - AI
                                      - AQ
                                      - AG
                                      - AR
                                      - AM
                                      - AW
                                      - AU
                                      - AT
                                      - AZ
                                      - BS
                                      - BH
                                      - BD
                                      - BB
                                      - BY
                                      - BE
                                      - BZ
                                      - BJ
                                      - BM
                                      - BT
                                      - BO
                                      - BA
                                      - BW
                                      - BV
                                      - BR
                                      - IO
                                      - BN
                                      - BG
                                      - BF
                                      - BI
                                      - KH
                                      - CM
                                      - CA
                                      - CV
                                      - KY
                                      - CF
                                      - TD
                                      - CL
                                      - CN
                                      - CX
                                      - CC
                                      - CO
                                      - KM
                                      - CG
                                      - CD
                                      - CK
                                      - CR
                                      - CI
                                      - HR
                                      - CU
                                      - CW
                                      - CY
                                      - CZ
                                      - DK
                                      - DJ
                                      - DM
                                      - DO
                                      - EC
                                      - EG
                                      - SV
                                      - GQ
                                      - ER
                                      - EE
                                      - ET
                                      - FK
                                      - FO
                                      - FJ
                                      - FI
                                      - FR
                                      - GF
                                      - PF
                                      - TF
                                      - GA
                                      - GM
                                      - GE
                                      - DE
                                      - GH
                                      - GI
                                      - GR
                                      - GL
                                      - GD
                                      - GP
                                      - GU
                                      - GT
                                      - GG
                                      - GN
                                      - GW
                                      - GY
                                      - HT
                                      - HM
                                      - VA
                                      - HN
                                      - HK
                                      - HU
                                      - IS
                                      - IN
                                      - ID
                                      - IR
                                      - IQ
                                      - IE
                                      - IM
                                      - IL
                                      - IT
                                      - JM
                                      - JP
                                      - JE
                                      - JO
                                      - KZ
                                      - KE
                                      - KI
                                      - KR
                                      - KW
                                      - KG
                                      - LA
                                      - LV
                                      - LB
                                      - LS
                                      - LR
                                      - LY
                                      - LI
                                      - LT
                                      - LU
                                      - MO
                                      - MK
                                      - MG
                                      - MW
                                      - MY
                                      - MV
                                      - ML
                                      - MT
                                      - MH
                                      - MQ
                                      - MR
                                      - MU
                                      - YT
                                      - MX
                                      - FM
                                      - MD
                                      - MC
                                      - MN
                                      - ME
                                      - MS
                                      - MA
                                      - MZ
                                      - MM
                                      - NA
                                      - NR
                                      - NP
                                      - NL
                                      - AN
                                      - NC
                                      - NZ
                                      - NI
                                      - NE
                                      - NG
                                      - NU
                                      - NF
                                      - MP
                                      - 'NO'
                                      - OM
                                      - PK
                                      - PW
                                      - PS
                                      - PA
                                      - PG
                                      - PY
                                      - PE
                                      - PH
                                      - PN
                                      - PL
                                      - PT
                                      - PR
                                      - QA
                                      - RE
                                      - RO
                                      - RU
                                      - RW
                                      - BL
                                      - SH
                                      - KN
                                      - LC
                                      - MF
                                      - PM
                                      - VC
                                      - WS
                                      - SM
                                      - ST
                                      - SA
                                      - SN
                                      - SS
                                      - RS
                                      - SC
                                      - SL
                                      - SG
                                      - SK
                                      - SI
                                      - SB
                                      - SO
                                      - ZA
                                      - GS
                                      - ES
                                      - LK
                                      - SD
                                      - SR
                                      - SJ
                                      - SZ
                                      - SE
                                      - CH
                                      - SY
                                      - TW
                                      - TJ
                                      - TZ
                                      - TH
                                      - TL
                                      - TG
                                      - TK
                                      - TO
                                      - TT
                                      - TN
                                      - TR
                                      - TM
                                      - TC
                                      - TV
                                      - UG
                                      - UA
                                      - AE
                                      - GB
                                      - US
                                      - UM
                                      - UY
                                      - UZ
                                      - VU
                                      - VE
                                      - VN
                                      - VG
                                      - VI
                                      - WF
                                      - EH
                                      - YE
                                      - ZM
                                      - ZW
                                      - BQ
                                      - KP
                                      - SX
                                      - XK
                                      - AC
                                    description: >-
                                      The ISO 3166-1 alpha-2 country code for
                                      the country this location is in.
                                    example: US
                                  latitude:
                                    type:
                                      - string
                                      - 'null'
                                    pattern: ^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$
                                    description: >-
                                      The latitude of the location. Validated by
                                      the regular expression
                                      `/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/`.
                                      Values are stored with up to 9 decimal
                                      places of precision. Note that this value
                                      is not currently represented in the UI but
                                      will be persisted and readable through API
                                      calls.}
                                    example: '37.331741'
                                  longitude:
                                    type:
                                      - string
                                      - 'null'
                                    pattern: >-
                                      ^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
                                    description: >-
                                      The longitude of the location. Validated
                                      by the regular expression
                                      `/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/`.
                                      Values are stored with up to 9 decimal
                                      places of precision. Note that this value
                                      is not currently represented in the UI but
                                      will be persisted and readable through API
                                      calls.}
                                    example: '-122.030333'
                                  attribute_type:
                                    type: string
                                    enum:
                                      - location
                                    description: The attribute type of the value.
                                    example: location
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - line_1
                                  - line_2
                                  - line_3
                                  - line_4
                                  - locality
                                  - region
                                  - postcode
                                  - country_code
                                  - latitude
                                  - longitude
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  value:
                                    type: number
                                    description: Numbers are persisted as 64 bit floats.
                                    example: 42
                                  attribute_type:
                                    type: string
                                    enum:
                                      - number
                                    description: The attribute type of the value.
                                    example: number
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - value
                                  - attribute_type
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  first_name:
                                    type: string
                                    description: The first name.
                                    example: Ada
                                  last_name:
                                    type: string
                                    description: The last name.
                                    example: Lovelace
                                  full_name:
                                    type: string
                                    description: The full name.
                                    example: Ada Lovelace
                                  attribute_type:
                                    type: string
                                    enum:
                                      - personal-name
                                    description: The attribute type of the value.
                                    example: personal-name
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - first_name
                                  - last_name
                                  - full_name
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  original_phone_number:
                                    type: string
                                    description: >-
                                      The raw, original phone number, as
                                      inputted.
                                    example: '5558675309'
                                  country_code:
                                    type: string
                                    description: >-
                                      The ISO 3166-1 alpha-2 country code
                                      representing the country that this phone
                                      number belongs to.
                                    enum:
                                      - AF
                                      - AX
                                      - AL
                                      - DZ
                                      - AS
                                      - AD
                                      - AO
                                      - AI
                                      - AQ
                                      - AG
                                      - AR
                                      - AM
                                      - AW
                                      - AU
                                      - AT
                                      - AZ
                                      - BS
                                      - BH
                                      - BD
                                      - BB
                                      - BY
                                      - BE
                                      - BZ
                                      - BJ
                                      - BM
                                      - BT
                                      - BO
                                      - BA
                                      - BW
                                      - BV
                                      - BR
                                      - IO
                                      - BN
                                      - BG
                                      - BF
                                      - BI
                                      - KH
                                      - CM
                                      - CA
                                      - CV
                                      - KY
                                      - CF
                                      - TD
                                      - CL
                                      - CN
                                      - CX
                                      - CC
                                      - CO
                                      - KM
                                      - CG
                                      - CD
                                      - CK
                                      - CR
                                      - CI
                                      - HR
                                      - CU
                                      - CW
                                      - CY
                                      - CZ
                                      - DK
                                      - DJ
                                      - DM
                                      - DO
                                      - EC
                                      - EG
                                      - SV
                                      - GQ
                                      - ER
                                      - EE
                                      - ET
                                      - FK
                                      - FO
                                      - FJ
                                      - FI
                                      - FR
                                      - GF
                                      - PF
                                      - TF
                                      - GA
                                      - GM
                                      - GE
                                      - DE
                                      - GH
                                      - GI
                                      - GR
                                      - GL
                                      - GD
                                      - GP
                                      - GU
                                      - GT
                                      - GG
                                      - GN
                                      - GW
                                      - GY
                                      - HT
                                      - HM
                                      - VA
                                      - HN
                                      - HK
                                      - HU
                                      - IS
                                      - IN
                                      - ID
                                      - IR
                                      - IQ
                                      - IE
                                      - IM
                                      - IL
                                      - IT
                                      - JM
                                      - JP
                                      - JE
                                      - JO
                                      - KZ
                                      - KE
                                      - KI
                                      - KR
                                      - KW
                                      - KG
                                      - LA
                                      - LV
                                      - LB
                                      - LS
                                      - LR
                                      - LY
                                      - LI
                                      - LT
                                      - LU
                                      - MO
                                      - MK
                                      - MG
                                      - MW
                                      - MY
                                      - MV
                                      - ML
                                      - MT
                                      - MH
                                      - MQ
                                      - MR
                                      - MU
                                      - YT
                                      - MX
                                      - FM
                                      - MD
                                      - MC
                                      - MN
                                      - ME
                                      - MS
                                      - MA
                                      - MZ
                                      - MM
                                      - NA
                                      - NR
                                      - NP
                                      - NL
                                      - AN
                                      - NC
                                      - NZ
                                      - NI
                                      - NE
                                      - NG
                                      - NU
                                      - NF
                                      - MP
                                      - 'NO'
                                      - OM
                                      - PK
                                      - PW
                                      - PS
                                      - PA
                                      - PG
                                      - PY
                                      - PE
                                      - PH
                                      - PN
                                      - PL
                                      - PT
                                      - PR
                                      - QA
                                      - RE
                                      - RO
                                      - RU
                                      - RW
                                      - BL
                                      - SH
                                      - KN
                                      - LC
                                      - MF
                                      - PM
                                      - VC
                                      - WS
                                      - SM
                                      - ST
                                      - SA
                                      - SN
                                      - SS
                                      - RS
                                      - SC
                                      - SL
                                      - SG
                                      - SK
                                      - SI
                                      - SB
                                      - SO
                                      - ZA
                                      - GS
                                      - ES
                                      - LK
                                      - SD
                                      - SR
                                      - SJ
                                      - SZ
                                      - SE
                                      - CH
                                      - SY
                                      - TW
                                      - TJ
                                      - TZ
                                      - TH
                                      - TL
                                      - TG
                                      - TK
                                      - TO
                                      - TT
                                      - TN
                                      - TR
                                      - TM
                                      - TC
                                      - TV
                                      - UG
                                      - UA
                                      - AE
                                      - GB
                                      - US
                                      - UM
                                      - UY
                                      - UZ
                                      - VU
                                      - VE
                                      - VN
                                      - VG
                                      - VI
                                      - WF
                                      - EH
                                      - YE
                                      - ZM
                                      - ZW
                                      - BQ
                                      - KP
                                      - SX
                                      - XK
                                      - AC
                                    example: US
                                  phone_number:
                                    type: string
                                    example: '+15558675309'
                                  attribute_type:
                                    type: string
                                    enum:
                                      - phone-number
                                    description: The attribute type of the value.
                                    example: phone-number
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - original_phone_number
                                  - country_code
                                  - phone_number
                                  - attribute_type
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  status:
                                    $ref: '#/components/schemas/status'
                                  attribute_type:
                                    type: string
                                    enum:
                                      - status
                                    description: The attribute type of the value.
                                    example: status
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - status
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  value:
                                    type: number
                                    description: >-
                                      A number between 0 and 5 (inclusive) to
                                      represent a star rating.
                                    example: 3
                                  attribute_type:
                                    type: string
                                    enum:
                                      - rating
                                    description: The attribute type of the value.
                                    example: rating
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - value
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  option:
                                    $ref: '#/components/schemas/select-option'
                                  attribute_type:
                                    type: string
                                    enum:
                                      - select
                                    description: The attribute type of the value.
                                    example: select
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - option
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  value:
                                    type: string
                                    description: >-
                                      A raw text field. Values are limited to
                                      10MB.
                                    example: >-
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua.
                                  attribute_type:
                                    type: string
                                    enum:
                                      - text
                                    description: The attribute type of the value.
                                    example: text
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - value
                                  - attribute_type
                                additionalProperties: false
                              - type: object
                                properties:
                                  active_from:
                                    type: string
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      made "active". `active_from` can be
                                      considered roughly analogous to
                                      `created_at`.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  active_until:
                                    type:
                                      - string
                                      - 'null'
                                    format: date-time
                                    description: >-
                                      The point in time at which this value was
                                      deactivated. If `null`, the value is
                                      active.
                                    example: '2023-01-01T15:00:00.000000000Z'
                                  created_by_actor:
                                    type: object
                                    description: The actor that created this value.
                                    properties:
                                      id:
                                        type: string
                                        description: An ID to identify the actor.
                                        nullable: true
                                      type:
                                        type: string
                                        enum:
                                          - api-token
                                          - workspace-member
                                          - system
                                          - app
                                        nullable: true
                                        description: >-
                                          The type of actor. [Read more
                                          information on actor types
                                          here](/docs/actors).
                                    example:
                                      type: workspace-member
                                      id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                                  attribute_type:
                                    type: string
                                    enum:
                                      - timestamp
                                    description: The attribute type of the value.
                                    example: timestamp
                                  value:
                                    type: string
                                    description: >-
                                      A timestamp value represents a single,
                                      universal moment in time using an ISO 8601
                                      formatted string. This means that a
                                      timestamp consists of a date, a time (with
                                      nanosecond precision), and a time zone.
                                      Attio will coerce timestamps which do not
                                      provide full nanosecond precision and UTC
                                      is assumed if no time zone is provided.
                                      For example, "2023", "2023-01",
                                      "2023-01-02", "2023-01-02T13:00",
                                      "2023-01-02T13:00:00", and
                                      "2023-01-02T13:00:00.000000000" will all
                                      be coerced to
                                      "2023-01-02T13:00:00.000000000Z".
                                      Timestamps are always returned in UTC. For
                                      example, writing a timestamp value using
                                      the string
                                      "2023-01-02T13:00:00.000000000+02:00" will
                                      result in the value
                                      "2023-01-02T11:00:00.000000000Z" being
                                      returned. The maximum date is
                                      "9999-12-31T23:59:59.999999999Z".
                                    format: date
                                    example: '2023-01-01T15:00:00.000000000Z'
                                required:
                                  - active_from
                                  - active_until
                                  - created_by_actor
                                  - attribute_type
                                  - value
                                additionalProperties: false
                        description: >-
                          A list of attribute values for the list entry (not
                          attribute values for its parent record).
                        example:
                          status:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: workspace-member
                                id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                              status:
                                id:
                                  workspace_id: 14beef7a-99f7-4534-a87e-70b564330a4c
                                  object_id: 33ebdbe9-e529-47c9-b894-0ba25e9c15c0
                                  attribute_id: e350362f-4b55-4c0f-93f4-379ae8ff2e5b
                                  status_id: 527def35-7994-4ef7-9584-80ef8de352a8
                                title: In Progress
                                is_archived: false
                                target_time_in_status: null
                                celebration_enabled: false
                              attribute_type: status
                          created_at:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: workspace-member
                                id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                              value: '2023-01-01T15:00:00.000000000Z'
                              attribute_type: timestamp
                          created_by:
                            - active_from: '2023-01-01T15:00:00.000000000Z'
                              active_until: null
                              created_by_actor:
                                type: workspace-member
                                id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                              referenced_actor_id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                              referenced_actor_type: workspace-member
                              attribute_type: actor-reference
                    required:
                      - id
                      - parent_record_id
                      - parent_object
                      - created_at
                      - entry_values
            description: Success
            requiredProperties:
              - data
        examples:
          example:
            value:
              data:
                id:
                  workspace_id: 14beef7a-99f7-4534-a87e-70b564330a4c
                  list_id: 33ebdbe9-e529-47c9-b894-0ba25e9c15c0
                  entry_id: 2e6e29ea-c4e0-4f44-842d-78a891f8c156
                parent_record_id: 891dcbfc-9141-415d-9b2a-2238a6cc012d
                parent_object: people
                created_at: '2022-11-21T13:22:49.061281000Z'
                entry_values:
                  status:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: workspace-member
                        id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                      status:
                        id:
                          workspace_id: 14beef7a-99f7-4534-a87e-70b564330a4c
                          object_id: 33ebdbe9-e529-47c9-b894-0ba25e9c15c0
                          attribute_id: e350362f-4b55-4c0f-93f4-379ae8ff2e5b
                          status_id: 527def35-7994-4ef7-9584-80ef8de352a8
                        title: In Progress
                        is_archived: false
                        target_time_in_status: null
                        celebration_enabled: false
                      attribute_type: status
                  created_at:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: workspace-member
                        id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                      value: '2023-01-01T15:00:00.000000000Z'
                      attribute_type: timestamp
                  created_by:
                    - active_from: '2023-01-01T15:00:00.000000000Z'
                      active_until: null
                      created_by_actor:
                        type: workspace-member
                        id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                      referenced_actor_id: 50cf242c-7fa3-4cad-87d0-75b1af71c57b
                      referenced_actor_type: workspace-member
                      attribute_type: actor-reference
        description: Success
    '400':
      application/json:
        schemaArray:
          - type: object
            properties:
              status_code:
                allOf:
                  - type: number
                    enum:
                      - 400
              type:
                allOf:
                  - type: string
                    enum:
                      - invalid_request_error
              code:
                allOf:
                  - type: string
                    enum:
                      - value_not_found
              message:
                allOf:
                  - type: string
                    example: >-
                      Parent record with slug/ID
                      "891dcbfc-9141-415d-9b2a-2238a6cc012d" not found.
            description: Bad Request
            requiredProperties:
              - status_code
              - type
              - code
              - message
        examples:
          example:
            value:
              status_code: 400
              type: invalid_request_error
              code: value_not_found
              message: >-
                Parent record with slug/ID
                "891dcbfc-9141-415d-9b2a-2238a6cc012d" not found.
        description: Bad Request
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              status_code:
                allOf:
                  - type: number
                    enum:
                      - 404
              type:
                allOf:
                  - type: string
                    enum:
                      - invalid_request_error
              code:
                allOf:
                  - type: string
                    enum:
                      - not_found
              message:
                allOf:
                  - type: string
                    example: Could not find list with slug/ID "enterprise_sales".
            description: Not Found
            requiredProperties:
              - status_code
              - type
              - code
              - message
        examples:
          example:
            value:
              status_code: 404
              type: invalid_request_error
              code: not_found
              message: Could not find list with slug/ID "enterprise_sales".
        description: Not Found
  deprecated: false
  type: path
components:
  schemas:
    status:
      type: object
      properties:
        id:
          type: object
          properties:
            workspace_id:
              type: string
              format: uuid
              description: The ID of the workspace
              example: 14beef7a-99f7-4534-a87e-70b564330a4c
            object_id:
              type: string
              format: uuid
              description: The ID of the object
              example: 97052eb9-e65e-443f-a297-f2d9a4a7f795
            attribute_id:
              type: string
              format: uuid
              description: The ID of the attribute
              example: 41252299-f8c7-4b5e-99c9-4ff8321d2f96
            status_id:
              type: string
              format: uuid
              description: The ID of the status
              example: 11f07f01-c10f-4e05-a522-33e050bc52ee
          required:
            - workspace_id
            - object_id
            - attribute_id
            - status_id
        title:
          type: string
          description: The title of the status
          example: In Progress
        is_archived:
          type: boolean
          description: >-
            Whether or not to archive the status. See our [archiving
            guide](/docs/archiving-vs-deleting) for more information on
            archiving.
          example: false
        celebration_enabled:
          type: boolean
          description: >-
            Whether arriving at this status triggers a celebration effect in the
            UI
          example: false
        target_time_in_status:
          type:
            - string
            - 'null'
          description: >-
            Target time for a record to spend in given status expressed as a
            ISO-8601 duration string
          example: P0Y0M1DT0H0M0S
      required:
        - id
        - title
        - is_archived
        - celebration_enabled
        - target_time_in_status
    select-option:
      type: object
      properties:
        id:
          type: object
          properties:
            workspace_id:
              type: string
              format: uuid
              description: The ID of the workspace
              example: 14beef7a-99f7-4534-a87e-70b564330a4c
            object_id:
              type: string
              format: uuid
              description: The ID of the object
              example: 97052eb9-e65e-443f-a297-f2d9a4a7f795
            attribute_id:
              type: string
              format: uuid
              description: The ID of the attribute
              example: 41252299-f8c7-4b5e-99c9-4ff8321d2f96
            option_id:
              type: string
              format: uuid
              description: The ID of the select option
              example: 08c2c59a-c18e-40c6-8dc4-95415313b2ea
          required:
            - workspace_id
            - object_id
            - attribute_id
            - option_id
        title:
          type: string
          description: The title of the select option
          example: Medium
        is_archived:
          type: boolean
          description: >-
            Whether or not to archive the select option. See our [archiving
            guide](/docs/archiving-vs-deleting) for more information on
            archiving.
          example: false
      required:
        - id
        - title
        - is_archived

````