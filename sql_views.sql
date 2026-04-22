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


SELECT t.* FROM tags as t
LEFT JOIN sc_t_relationship as sc_t
ON sc_t.tag_id = t.tag_id
LEFT JOIN sub_categories as sc
ON sc_t.sub_category_id = sc.sub_category_id
WHERE sc.sub_category_id = 1

SELECT p.*, c.currency_code, sc.sub_category_name, sc.sub_category_name_ar FROM products as p
LEFT JOIN sc_t_p_relationship as sc_t_p
ON sc_t_p.product_id = p.product_id
LEFT JOIN sc_t_relationship as sc_t
ON sc_t_p.sc_t_id = sc_t.sc_t_id
LEFT JOIN sub_categories as sc
ON sc_t.sub_category_id = sc.sub_category_id
LEFT JOIN tags as t
ON sc_t.tag_id = t.tag_id
LEFT JOIN currency as c
ON p.currency_id = c.currency_id
WHERE sc_t.tag_id = 1