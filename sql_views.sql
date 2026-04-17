SELECT sc.* FROM sub_categories as sc
LEFT JOIN categories as c
ON sc.category_id = c.category_id
WHERE c.category_id = 3
###

SELECT p.*, c.currency_code, sc.sub_category_name, sc.sub_category_name_ar FROM products as p
LEFT JOIN currency as c
ON c.currency_id = p.currency_id
LEFT JOIN sub_categories as sc
ON sc.sub_category_id = p.sub_category_id
###

SELECT t.* FROM tags as t
LEFT JOIN sc_t_relationship as sct
ON sct.tag_id = t.tag_id
LEFT JOIN sub_categories as sc
ON sct.sub_category_id = sc.sub_category_id
WHERE sc.sub_category_id = 1