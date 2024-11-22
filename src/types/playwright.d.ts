export type TablesDetails = {
    table_name: string,
    row_count: number,
    columns_list: any[],
    last_present_time: any
}[]

export type TableCountByName = {
    row_count: number
}
