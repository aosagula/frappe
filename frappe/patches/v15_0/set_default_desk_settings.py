import frappe


def execute():
	frappe.db.sql(
		"""UPDATE `tabUser`
		SET search_bar = 1, notifications = 1
		WHERE (search_bar IS NULL OR search_bar = 0
			OR notifications IS NULL OR notifications = 0)
		AND user_type = 'System User'"""
	)
