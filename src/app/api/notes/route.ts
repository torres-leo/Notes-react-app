import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {
	try {
		const notes = await prisma.note.findMany();
		return NextResponse.json(notes);
	} catch (error) {
		if (error instanceof Error) {
			NextResponse.json({ message: error.message });
		}
	}
}

export async function POST(request: Request) {
	const body = await request.json();
	const { title, content } = body;
	try {
		const newNote = await prisma.note.create({
			data: {
				title,
				content,
			},
		});

		return NextResponse.json(newNote);
	} catch (error) {
		if (error instanceof Error) {
			NextResponse.json({ message: error.message });
		}
	}
}
