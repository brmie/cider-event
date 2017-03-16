package com.boram.cider.domain;

import java.util.Date;

public class EntryVO {
	private int entry_no;
	private String entry_name;
	private String entry_email;
	private String entry_melody;
	private Date entry_date;
	private int entry_winner;
	
	public EntryVO(){}

	public EntryVO(int entry_no, String entry_name, String entry_email, String entry_melody, Date entry_date,
			int entry_winner) {
		super();
		this.entry_no = entry_no;
		this.entry_name = entry_name;
		this.entry_email = entry_email;
		this.entry_melody = entry_melody;
		this.entry_date = entry_date;
		this.entry_winner = entry_winner;
	}

	public int getEntry_no() {
		return entry_no;
	}

	public void setEntry_no(int entry_no) {
		this.entry_no = entry_no;
	}

	public String getEntry_name() {
		return entry_name;
	}

	public void setEntry_name(String entry_name) {
		this.entry_name = entry_name;
	}

	public String getEntry_email() {
		return entry_email;
	}

	public void setEntry_email(String entry_email) {
		this.entry_email = entry_email;
	}

	public String getEntry_melody() {
		return entry_melody;
	}

	public void setEntry_melody(String entry_melody) {
		this.entry_melody = entry_melody;
	}

	public Date getEntry_date() {
		return entry_date;
	}

	public void setEntry_date(Date entry_date) {
		this.entry_date = entry_date;
	}

	public int getEntry_winner() {
		return entry_winner;
	}

	public void setEntry_winner(int entry_winner) {
		this.entry_winner = entry_winner;
	}
	
}