<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
				<table id="table">
					<tr>
						<th>Name</th>
						<th>Address</th>
						<th>Latitude</th>
						<th>Longitude</th>
						</tr>
					<xsl:for-each select="locations/location">
							<tr id="{position()}">
								<td>
									<xsl:value-of select="Name"/>
								</td>
								<td>
									<xsl:value-of select="Address"/>
								</td>
								<td>
									<xsl:value-of select="Latitude"/>
								</td>
								<td>
									<xsl:value-of select="Longitude"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
	</xsl:template>
</xsl:stylesheet>