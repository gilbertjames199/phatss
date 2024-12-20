import pandas as pd

def fetch_data_for_training():
    try:
        connection = get_db_connection()
        query = """
            SELECT
            municipality,
            barangay,
            purok_sitio,
            CASE WHEN _1_has_toilet = 'Yes' THEN 1 WHEN _1_has_toilet = 'No' THEN 0 END AS _1_has_toilet,
            CASE WHEN _2_toilet_used = 'Yes' THEN 1 WHEN _2_toilet_used = 'No' THEN 0 END AS _2_toilet_used,
            CASE WHEN _3_toilet_functional = 'Yes' THEN 1 WHEN _3_toilet_functional = 'No' THEN 0 END AS _3_toilet_functional,
            CASE WHEN _4_soap = 'Yes' THEN 1 WHEN _4_soap = 'No' THEN 0 END AS _4_soap,
            CASE WHEN _6_spaces = 'Yes' THEN 1 WHEN _6_spaces = 'No' THEN 0 END AS _6_spaces,
            CASE WHEN _7_feces = 'Yes' THEN 1 WHEN _7_feces = 'No' THEN 0 END AS _7_feces,
            CASE WHEN _8_composting = 'Yes' THEN 1 WHEN _8_composting = 'No' THEN 0 END AS _8_composting,
            CASE WHEN _9_dispose = 'Yes' THEN 1 WHEN _9_dispose = 'No' THEN 0 END AS _9_dispose,
            CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END AS _10_emptied,
            CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END AS _13_sewer,
            CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END AS _15_household,
            CASE WHEN _16_household = 'Yes' THEN 0 WHEN _16_household = 'No' THEN 0 END AS _16_household,
            CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END AS _17_using,
            CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END AS _19_materials
        FROM
            house_holds
        WHERE
            _1_has_toilet IN ('Yes', 'No') AND
            _2_toilet_used IN ('Yes', 'No') AND
            _3_toilet_functional IN ('Yes', 'No') AND
            _4_soap IN ('Yes', 'No') AND
            _6_spaces IN ('Yes', 'No') AND
            _7_feces IN ('Yes', 'No') AND
            _8_composting IN ('Yes', 'No') AND
            _9_dispose IN ('Yes', 'No') AND
            _10_emptied IN ('Yes', 'No') AND
            _13_sewer IN ('Yes', 'No') AND
            _15_household IN ('Yes', 'No') AND
            _16_household IN ('Yes', 'No') AND
            _17_using IN ('Yes', 'No') AND
            _19_materials IN ('Yes', 'No');
        """
        data = pd.read_sql(query, connection)
        return data
    except Exception as e:
        print("Error fetching data:", e)
        return None
    finally:
        connection.close()
